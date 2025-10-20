import { useState } from 'react';
import { useUpdateCart } from '../hooks/useUpdateCart';
import { useRemoveFromCart } from '../hooks/useRemoveFromCart';
import { Button } from '@/shared/components/ui/button';
import { Trash2 } from 'lucide-react';


export function CartItem({ item }: { item: any }) {
  const [isEditing, setIsEditing] = useState(false);
  const [quantity, setQuantity] = useState(item.quantity);

  const { mutate: updateCart, isPending: isUpdating } = useUpdateCart();
  const { mutate: removeFromCart, isPending: isRemoving } = useRemoveFromCart();

  const product = item.watch_id; 
  const price = parseFloat(item.price.$numberDecimal); 

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 1) return;
    if (newQuantity > product.stock) {
      alert(`Chỉ còn ${product.stock} sản phẩm trong kho`);
      setQuantity(product.stock);
      return;
    }
    setQuantity(newQuantity);
  };

  const handleSave = () => {
    
    if (quantity !== item.quantity) {
      updateCart(
        { cart_item_id: item._id, quantity: quantity },
        {
          onSuccess: () => {
            setIsEditing(false);
          },
        }
      );
    } else {
      setIsEditing(false);
    }
  };

  const handleRemove = () => {
    if (confirm('Xóa sản phẩm này khỏi giỏ hàng?')) {
      removeFromCart(item._id);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  if (!product) {
    return null; 
  }

  return (
    <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow">
      {}
      <img
        src={product.images.mainImg.url}
        alt={product.title}
        className="w-20 h-20 object-cover rounded"
      />

      {}
      <div className="flex-1">
        <h3 className="font-semibold text-gray-900">{product.title}</h3>
        <div className="flex items-baseline gap-2">
          {product.sale_price ? (
            <>
              <p className="text-sm font-semibold text-red-600">
                {product.sale_price.toLocaleString('vi-VN')} đ
              </p>
              <p className="text-xs text-gray-400 line-through">
                {product.price.toLocaleString('vi-VN')} đ
              </p>
            </>
          ) : (
            <p className="text-sm text-gray-500">
              {price.toLocaleString('vi-VN')} đ
            </p>
          )}
        </div>
      </div>

      {}
      {isEditing ? (
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleQuantityChange(quantity - 1)}
            className="w-8 h-8 flex items-center justify-center border rounded hover:bg-gray-100"
            disabled={quantity <= 1}
          >
            -
          </button>
          <span className="w-12 text-center">{quantity}</span>
          <button
            onClick={() => handleQuantityChange(quantity + 1)}
            className="w-8 h-8 flex items-center justify-center border rounded hover:bg-gray-100"
            disabled={quantity >= product.stock}
          >
            +
          </button>
        </div>
      ) : (
        <div className="w-28 text-center">x {item.quantity}</div>
      )}

      {}
      <div className="text-right w-32">
        {product.sale_price ? (
          <div>
            <p className="font-semibold text-red-600">
              {(product.sale_price * item.quantity).toLocaleString('vi-VN')} đ
            </p>
            <p className="text-xs text-gray-400 line-through">
              {(product.price * item.quantity).toLocaleString('vi-VN')} đ
            </p>
          </div>
        ) : (
          <p className="font-semibold text-blue-600">
            {(price * item.quantity).toLocaleString('vi-VN')} đ
          </p>
        )}
      </div>

      {}
      <div className="flex flex-col gap-2 w-24">
        {isEditing ? (
          <Button onClick={handleSave} disabled={isUpdating} size="sm">
            {isUpdating ? 'Đang lưu...' : 'Lưu'}
          </Button>
        ) : (
          <Button onClick={handleEdit} variant="outline" size="sm">
            Chỉnh sửa
          </Button>
        )}
        {isEditing && (
          <Button
            onClick={handleRemove}
            disabled={isRemoving}
            variant="destructive"
            size="sm"
            className="flex items-center gap-1"
          >
            <Trash2 className="w-4 h-4" />
            Xóa
          </Button>
        )}
      </div>
    </div>
  );
}
import { useState } from 'react';
import { useUpdateCart } from '../hooks/useUpdateCart';
import { useRemoveFromCart } from '../hooks/useRemoveFromCart';
import { Button } from '@/shared/components/ui/button';
import { Trash2 } from 'lucide-react';

// The item prop now directly receives the item object from the backend API response
export function CartItem({ item }: { item: any }) {
  const [isEditing, setIsEditing] = useState(false);
  const [quantity, setQuantity] = useState(item.quantity);

  const { mutate: updateCart, isPending: isUpdating } = useUpdateCart();
  const { mutate: removeFromCart, isPending: isRemoving } = useRemoveFromCart();

  const product = item.watch_id; // The product object is in the 'watch_id' field
  const price = parseFloat(item.price.$numberDecimal); // Convert Decimal128 to number

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
    // Only call mutation if quantity has changed
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
    return null; // Or a placeholder for a product that couldn't be loaded
  }

  return (
    <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow">
      {/* Image */}
      <img
        src={product.images.mainImg.url}
        alt={product.title}
        className="w-20 h-20 object-cover rounded"
      />

      {/* Info */}
      <div className="flex-1">
        <h3 className="font-semibold text-gray-900">{product.title}</h3>
        <p className="text-sm text-gray-500">
          {price.toLocaleString('vi-VN')} đ
        </p>
      </div>

      {/* Quantity & Actions */}
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

      {/* Total */}
      <div className="text-right w-32">
        <p className="font-semibold text-blue-600">
          {(price * item.quantity).toLocaleString('vi-VN')} đ
        </p>
      </div>

      {/* Buttons */}
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
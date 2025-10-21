import { useState } from 'react';
import { useUpdateCart } from '../hooks/useUpdateCart';
import { useRemoveFromCart } from '../hooks/useRemoveFromCart';
import { Button } from '@/shared/components/ui/button';
import { Trash2 } from 'lucide-react';
import styles from './CartItem.module.css';

export function CartItem({ item }: { item: any }) {
  const [isEditing, setIsEditing] = useState(false);
  const [quantity, setQuantity] = useState(item.quantity);

  const { mutate: updateCart, isPending: isUpdating } = useUpdateCart();
  const { mutate: removeFromCart, isPending: isRemoving } = useRemoveFromCart();

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 1) return;
    if (newQuantity > item.stock) {
      alert(`Chỉ còn ${item.stock} sản phẩm trong kho`);
      setQuantity(item.stock);
      return;
    }
    setQuantity(newQuantity);
  };

  const handleSave = () => {
    
    if (quantity !== item.quantity) {
      updateCart(
        { cart_item_id: item.id, quantity: quantity },
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
      removeFromCart(item.id);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  return (
    <div className={styles.cartItem}>
      <img
        src={item.product_image || '/assets/image/placeholder.png'}
        alt={item.product_name}
        className={styles.productImage}
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.src = '/assets/image/placeholder.png';
        }}
      />

      <div className={styles.productInfo}>
        <h3 className={styles.productTitle}>{item.product_name}</h3>
        <div className={styles.priceWrapper}>
          <p className={styles.regularPrice}>
            {item.price.toLocaleString('vi-VN')} đ
          </p>
        </div>
      </div>

      {isEditing ? (
        <div className={styles.quantityEditor}>
          <button
            onClick={() => handleQuantityChange(quantity - 1)}
            className={styles.quantityButton}
            disabled={quantity <= 1}
          >
            -
          </button>
          <span className={styles.quantityDisplay}>{quantity}</span>
          <button
            onClick={() => handleQuantityChange(quantity + 1)}
            className={styles.quantityButton}
            disabled={quantity >= item.stock}
          >
            +
          </button>
        </div>
      ) : (
        <div className={styles.quantityStatic}>x {item.quantity}</div>
      )}

      <div className={styles.totalPriceWrapper}>
        <p className={styles.totalRegularPrice}>
          {(item.price * item.quantity).toLocaleString('vi-VN')} đ
        </p>
      </div>

      <div className={styles.actions}>
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
            className={styles.deleteButton}
          >
            <Trash2 className={styles.deleteIcon} />
            Xóa
          </Button>
        )}
      </div>
    </div>
  );
}
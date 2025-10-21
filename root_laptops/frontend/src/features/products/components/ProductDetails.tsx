'use client';
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Product } from '@/features/products/types';
import { Button } from '@/shared/components/ui/button';
import { ChevronUp, ChevronDown, Heart, Share2, ShoppingCart, CreditCard } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { useWishlistStore } from '@/features/wishlist/store/wishlistStore';
import { Badge } from '@/ui/badge';
import { toast } from 'sonner';
import styles from './ProductDetails.module.css';

interface ProductDetailsProps {
  product: Product;
  quantity: number;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
}

export function ProductDetails({ product, quantity, setQuantity }: ProductDetailsProps) {
  const router = useRouter();
  const { title, price, sale_price, sku, brand, color_id, category_id, tags, gender, origin } = product;
  const addToCart = useCartStore((state) => state.addToCart);
  const addToWishlist = useWishlistStore((state) => state.addToWishlist);
  const removeFromWishlist = useWishlistStore((state) => state.removeFromWishlist);
  const isInWishlist = useWishlistStore((state) => state.isInWishlist);

  const hasDiscount = sale_price && sale_price < price;
  const discountPercent = hasDiscount ? Math.round(((price - sale_price) / price) * 100) : 0;
  const finalPrice = hasDiscount ? sale_price : price;
  const totalPrice = finalPrice * quantity;
  const productInWishlist = isInWishlist(product._id);

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleBuyNow = async () => {
    await addToCart(product, quantity);
    router.push('/cart');
  };

  const handleToggleWishlist = () => {
    if (productInWishlist) {
      removeFromWishlist(product._id);
    } else {
      addToWishlist(product);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.title,
          text: `Check out ${product.title}`,
          url: window.location.href,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      // Fallback: Copy URL to clipboard
      try {
        await navigator.clipboard.writeText(window.location.href);
        toast.success('Link copied to clipboard!');
      } catch (error) {
        toast.error('Failed to copy link');
      }
    }
  };

  return (
    <div className={styles.detailsWrapper}>
      <nav className={styles.breadcrumb}>
        <Link href="/" className={styles.breadcrumbLink}>Home</Link>
        <span className={styles.breadcrumbSeparator}>/</span>
        <Link href="/products" className={styles.breadcrumbLink}>Products</Link>
        <span className={styles.breadcrumbSeparator}>/</span>
        <span className={styles.breadcrumbCurrent}>{title}</span>
      </nav>

      <div>
        <h1 className={styles.title}>{title}</h1>
        <div className={styles.meta}>
          <Badge variant="secondary" className="text-xs">{brand}</Badge>
          {category_id && category_id.length > 0 && (
            <Badge variant="outline" className="text-xs">{category_id[0].category}</Badge>
          )}
          <Link href="#reviews" className={styles.reviewLink}>
            ⭐ Be the first to review
          </Link>
        </div>
      </div>

      <div className={styles.priceBox}>
        <div className={styles.priceWrapper}>
          <span className={styles.finalPrice}>
            {finalPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
          </span>
          {hasDiscount && (
            <>
              <span className={styles.originalPrice}>
                {price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
              </span>
              <Badge variant="destructive" className="text-sm">-{discountPercent}%</Badge>
            </>
          )}
        </div>
      </div>

      <div className={styles.infoGrid}>
        <div className={styles.infoItem}>
          <span className={styles.infoLabel}>SKU:</span>
          <span className={styles.infoValue}>{sku}</span>
        </div>
        {origin && (
          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>Origin:</span>
            <span className={styles.infoValue}>{origin}</span>
          </div>
        )}
        {gender && (
          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>Gender:</span>
            <span className={styles.infoValueCapitalize}>{gender}</span>
          </div>
        )}
        {color_id && color_id.length > 0 && (
          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>Colors:</span>
            <div className={styles.badgeGroup}>
              {color_id.map((color) => (
                <Badge key={color._id} variant="outline" className="text-xs">
                  {color.color}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>

      {tags && tags.length > 0 && (
        <div className={styles.badgeGroup}>
          {tags.map((tag, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      )}

      <div className={styles.actionsWrapper}>
        <div className={styles.quantitySection}>
          <span className={styles.quantityLabel}>Quantity:</span>
          <div className={styles.quantityControl}>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setQuantity(q => (q > 1 ? q - 1 : 1))}
              className={styles.quantityButton}
            >
              <ChevronDown className={styles.quantityIcon} />
            </Button>
            <span className={styles.quantityValue}>{quantity}</span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setQuantity(q => q + 1)}
              className={styles.quantityButton}
            >
              <ChevronUp className={styles.quantityIcon} />
            </Button>
          </div>
          <div className={styles.totalPriceWrapper}>
            <span className={styles.totalLabel}>Total:</span>
            <span className={styles.totalValue}>
              {totalPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
            </span>
          </div>
        </div>

        <div className={styles.mainButtons}>
          <Button 
            onClick={handleAddToCart}
            className={styles.mainButton}
            size="lg"
          >
            <ShoppingCart className={styles.buttonIcon} />
            Add to Cart
          </Button>
          <Button 
            onClick={handleBuyNow}
            variant="default"
            className={styles.buyNowButton}
            size="lg"
          >
            <CreditCard className={styles.buttonIcon} />
            Buy Now
          </Button>
        </div>

        <div className={styles.secondaryButtons}>
          <Button 
            onClick={handleToggleWishlist}
            variant={productInWishlist ? "default" : "outline"}
            className={styles.wishlistButton} 
            size="lg"
          >
            <Heart className={styles.buttonIcon} fill={productInWishlist ? "currentColor" : "none"} />
            {productInWishlist ? "In Wishlist" : "Add to Wishlist"}
          </Button>
          <Button 
            onClick={handleShare}
            variant="outline" 
            size="lg"
          >
            <Share2 className={styles.shareIcon} />
          </Button>
        </div>
      </div>

      <div className={styles.perks}>
        <div className={styles.perkItem}>
          <span className={styles.perkIcon}>✓</span>
          <span>Free shipping for orders over 500,000₫</span>
        </div>
        <div className={styles.perkItem}>
          <span className={styles.perkIcon}>✓</span>
          <span>30-day return policy</span>
        </div>
        <div className={styles.perkItem}>
          <span className={styles.perkIcon}>✓</span>
          <span>Genuine product warranty</span>
        </div>
      </div>
    </div>
  );
}

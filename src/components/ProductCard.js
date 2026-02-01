import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import styles from './ProductCard.module.css';

const ProductCard = ({ product }) => {
  const { addToCart, toggleLike, isLiked } = useApp();
  const [isHovered, setIsHovered] = useState(false);
  const liked = isLiked(product.id);

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <img
        key={index}
        src={require(`../assets/images/icons/star-${index < rating ? 'filled' : 'empty'}.png`)}
        alt="star"
        className={styles.star}
      />
    ));
  };

  return (
    <div 
      className={styles.card}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {product.discount && (
        <div className={styles.discountBadge}>-{product.discount}%</div>
      )}

      <button 
        className={`${styles.likeButton} ${liked ? styles.liked : ''}`}
        onClick={() => toggleLike(product)}
      >
        <img 
          src={require(`../assets/images/icons/heart${liked ? '-filled' : ''}.png`)}
          alt="Like"
          className={styles.likeIcon}
        />
      </button>

      <div className={`${styles.imageContainer} ${isHovered ? styles.hovered : ''}`}>
        <img 
          src={require(`../assets/images/products/product-${product.id}.png`)}
          alt={product.name}
          className={styles.productImage}
        />
        
        {isHovered && (
          <button 
            className={styles.addToCartButton}
            onClick={() => addToCart(product)}
          >
            Add To Cart
          </button>
        )}
      </div>

      <div className={styles.productInfo}>
        <h3 className={styles.productName}>{product.name}</h3>
        <div className={styles.priceContainer}>
          <span className={styles.price}>${product.price}</span>
          {product.originalPrice && (
            <span className={styles.originalPrice}>${product.originalPrice}</span>
          )}
        </div>
        <div className={styles.rating}>
          <div className={styles.stars}>
            {renderStars(product.rating)}
          </div>
          <span className={styles.reviewCount}>({product.reviews})</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

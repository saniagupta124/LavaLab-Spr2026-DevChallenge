import React from 'react';
import { useApp } from '../context/AppContext';
import styles from './LikesPanel.module.css';

const LikesPanel = () => {
  const { likes, closeSidePanel, toggleLike, addToCart } = useApp();

  return (
    <div>
      <div className={styles.panelHeader}>
        <h2 className={styles.panelTitle}>Liked Items ({likes.length})</h2>
        <button className={styles.closeButton} onClick={closeSidePanel}>×</button>
      </div>

      <div className={styles.panelContent}>
        {likes.length === 0 ? (
          <div className={styles.emptyState}>
            <h3>No liked items yet</h3>
            <p>Start adding your favorites!</p>
            <button className={styles.primaryButton} onClick={closeSidePanel}>
              Browse Products
            </button>
          </div>
        ) : (
          <div className={styles.likesGrid}>
            {likes.map(item => (
              <div key={item.id} className={styles.likeItem}>
                <button 
                  className={styles.removeLike}
                  onClick={() => toggleLike(item)}
                >
                  ×
                </button>
                
                <img 
                  src={require(`../assets/images/products/product-${item.id}.png`)}
                  alt={item.name}
                  className={styles.itemImage}
                />
                
                <div className={styles.itemInfo}>
                  <h3 className={styles.itemName}>{item.name}</h3>
                  <p className={styles.itemPrice}>${item.price.toFixed(2)}</p>
                </div>

                <button 
                  className={styles.addToCartBtn}
                  onClick={() => addToCart(item)}
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LikesPanel;

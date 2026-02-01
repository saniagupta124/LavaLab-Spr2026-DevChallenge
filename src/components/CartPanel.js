import React from 'react';
import { useApp } from '../context/AppContext';
import styles from './CartPanel.module.css';

const CartPanel = () => {
  const { cart, closeSidePanel, updateCartQuantity, removeFromCart, getCartTotal } = useApp();

  return (
    <div>
      <div className={styles.panelHeader}>
        <h2 className={styles.panelTitle}>Your Cart ({cart.length})</h2>
        <button className={styles.closeButton} onClick={closeSidePanel}>×</button>
      </div>

      <div className={styles.panelContent}>
        {cart.length === 0 ? (
          <div className={styles.emptyState}>
            <h3>Your cart is empty</h3>
            <p>Add some products to get started!</p>
            <button className={styles.primaryButton} onClick={closeSidePanel}>
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            <div className={styles.cartItems}>
              {cart.map(item => (
                <div key={item.id} className={styles.cartItem}>
                  <img 
                    src={require(`../assets/images/products/product-${item.id}.png`)}
                    alt={item.name}
                    className={styles.itemImage}
                  />
                  
                  <div className={styles.itemDetails}>
                    <h3 className={styles.itemName}>{item.name}</h3>
                    <p className={styles.itemPrice}>${item.price.toFixed(2)}</p>
                    
                    <div className={styles.quantityControl}>
                      <button 
                        onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                        className={styles.quantityButton}
                      >
                        −
                      </button>
                      <span className={styles.quantity}>{item.quantity}</span>
                      <button 
                        onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                        className={styles.quantityButton}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <button 
                    className={styles.removeButton}
                    onClick={() => removeFromCart(item.id)}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>

            <div className={styles.cartFooter}>
              <div className={styles.totalRow}>
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className={styles.totalRow}>
                <span className={styles.totalLabel}>Total</span>
                <span className={styles.totalAmount}>${getCartTotal().toFixed(2)}</span>
              </div>
              
              <button className={styles.checkoutButton}>
                Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartPanel;

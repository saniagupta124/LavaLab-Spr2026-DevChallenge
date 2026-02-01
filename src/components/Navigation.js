import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import styles from './Navigation.module.css';

const Navigation = ({ activeCategory, setActiveCategory }) => {
  const { openSidePanel, getCartCount, likes } = useApp();

  const categories = ['women', 'men', 'kids', 'classic', 'sport', 'sale'];

  return (
    <nav className={styles.nav}>
      <div className={styles.leftSection}>
        <Link to="/" className={styles.logoLink}>
          <img 
            src={require('../assets/images/icons/logo.png')} 
            alt="Logo" 
            className={styles.logo}
          />
        </Link>
        
        <div className={styles.categories}>
          {categories.map(category => (
            <button
              key={category}
              className={`${styles.category} ${activeCategory === category ? styles.active : ''}`}
              onClick={() => setActiveCategory(category)}
            >
              <span className="animated-underline">
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className={styles.rightSection}>
        <button 
          className={styles.iconButton}
          onClick={() => openSidePanel('likes')}
        >
          <img 
            src={require('../assets/images/icons/heart.png')}
            alt="Likes"
            className={styles.icon}
          />
          {likes.length > 0 && (
            <span className={styles.badge}>{likes.length}</span>
          )}
        </button>

        <button 
          className={styles.iconButton}
          onClick={() => openSidePanel('cart')}
        >
          <img 
            src={require('../assets/images/icons/cart.png')}
            alt="Cart"
            className={styles.icon}
          />
          {getCartCount() > 0 && (
            <span className={styles.badge}>{getCartCount()}</span>
          )}
        </button>

        <button 
          className={styles.iconButton}
          onClick={() => openSidePanel('account')}
        >
          <img 
            src={require('../assets/images/icons/account.png')}
            alt="Account"
            className={styles.icon}
          />
        </button>
      </div>
    </nav>
  );
};

export default Navigation;

import React, { useState } from 'react';
import ProductCard from './ProductCard';
import styles from './ProductGallery.module.css';

const products = [
  { id: 1, name: 'HAVIT HV-G92 Gamepad', price: 160, rating: 5, reviews: 88, category: 'new' },
  { id: 2, name: 'HAVIT HV-G92 Gamepad', price: 160, rating: 5, reviews: 88, category: 'new' },
  { id: 3, name: 'HAVIT HV-G92 Gamepad', price: 160, rating: 5, reviews: 88, category: 'new' },
  { id: 4, name: 'HAVIT HV-G92 Gamepad', price: 960, originalPrice: 1160, rating: 4, reviews: 75, category: 'trending', discount: 35 },
  { id: 5, name: 'HAVIT HV-G92 Gamepad', price: 160, rating: 5, reviews: 88, category: 'new' },
  { id: 6, name: 'HAVIT HV-G92 Gamepad', price: 960, originalPrice: 1160, rating: 4, reviews: 75, category: 'trending', discount: 35 },
  { id: 7, name: 'HAVIT HV-G92 Gamepad', price: 160, rating: 5, reviews: 88, category: 'new' },
  { id: 8, name: 'HAVIT HV-G92 Gamepad', price: 960, originalPrice: 1160, rating: 4, reviews: 75, category: 'trending', discount: 35 },
];

const ProductGallery = () => {
  const [activeFilter, setActiveFilter] = useState(null);
  const [hoveredFilter, setHoveredFilter] = useState(null);

  const handleFilterClick = (filter) => {
    if (activeFilter === filter) {
      setActiveFilter(null);
    } else {
      setActiveFilter(filter);
    }
  };

  const filteredProducts = activeFilter 
    ? products.filter(p => p.category === activeFilter)
    : products;

  return (
    <div className={styles.gallery}>
      <div className={styles.filters}>
        <button
          className={`${styles.filterButton} ${activeFilter === 'new' ? styles.active : ''}`}
          onClick={() => handleFilterClick('new')}
          onMouseEnter={() => setHoveredFilter('new')}
          onMouseLeave={() => setHoveredFilter(null)}
        >
            <img
                src={require(`../assets/images/icons/new-arrivals${hoveredFilter === 'new' && activeFilter !== 'new' ? '-hover' : ''}.png`)}
                alt="New Arrivals"
                className={styles.filterImage}
            />
        </button>
        <button
          className={`${styles.filterButton} ${activeFilter === 'trending' ? styles.active : ''}`}
          onClick={() => handleFilterClick('trending')}
          onMouseEnter={() => setHoveredFilter('trending')}
          onMouseLeave={() => setHoveredFilter(null)}
        >
            <img
                src={require(`../assets/images/icons/whats-trending${hoveredFilter === 'trending' && activeFilter !== 'trending' ? '-hover' : ''}.png`)}
                alt="What's Trending"
                className={styles.filterImage}
            />
        </button>
      </div>

      <div className={styles.productGrid}>
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductGallery;

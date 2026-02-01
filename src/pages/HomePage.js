import React, { useState } from 'react';
import PromoBar from '../components/PromoBar';
import Navigation from '../components/Navigation';
import HeroSection from '../components/HeroSection';
import ProductGallery from '../components/ProductGallery';
import Footer from '../components/Footer';
import SidePanel from '../components/SidePanel';

const HomePage = () => {
  const [activeCategory, setActiveCategory] = useState(null); 

  const handleCategoryClick = (category) => {
    if (activeCategory === category) {
      setActiveCategory(null);
    } else {
      setActiveCategory(category);
    }
  };

  return (
    <div>
      <PromoBar />
      <Navigation 
        activeCategory={activeCategory}
        setActiveCategory={handleCategoryClick}
      />
      <HeroSection activeCategory={activeCategory} />
      <ProductGallery />
      <Footer />
      <SidePanel />
    </div>
  );
};

export default HomePage;

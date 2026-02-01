import React, { useState, useEffect } from 'react';
import styles from './HeroSection.module.css';

const HeroSection = ({ activeCategory }) => {
    const [scrollY, setScrollY] = useState(0);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [currentShoe, setCurrentShoe] = useState('hero-shoe.png');
    const [displayShoe, setDisplayShoe] = useState('hero-shoe.png');
    const [isAnimating, setIsAnimating] = useState(false);

    const [displayText, setDisplayText] = useState('SHOP ALL');
    const [previousText, setPreviousText] = useState(null);
    const [isCrossfading, setIsCrossfading] = useState(false);

    const shoeImages = {
        women: 'shoe-women.png',
        men: 'shoe-men.png',
        kids: 'shoe-kids.png',
        classic: 'shoe-classic.png',
        sport: 'shoe-sport.png',
        sale: 'shoe-sale.png',
    };

    const heroTexts = {
        women: 'WOMENS',
        men: 'MENS',
        kids: 'KIDS',
        classic: 'CLASSIC',
        sport: 'SPORT',
        sale: 'SALE',
    };

    const targetText = activeCategory ? heroTexts[activeCategory] || 'SHOP ALL' : 'SHOP ALL';

    useEffect(() => {
        if (targetText !== displayText) {
            setPreviousText(displayText);
            setDisplayText(targetText);
            setIsCrossfading(true);

            setTimeout(() => {
                setPreviousText(null);
                setIsCrossfading(false);
            }, 300);
        }
    }, [targetText]);

    useEffect(() => {
        if (activeCategory && shoeImages[activeCategory]) {
            const newShoe = shoeImages[activeCategory];
            if (newShoe !== currentShoe) {
                setIsAnimating(true);
                setDisplayShoe(newShoe);
                setTimeout(() => {
                    setCurrentShoe(newShoe);
                    setIsAnimating(false);
                }, 600);
            }
        } else if (!activeCategory) {
            if (currentShoe !== 'hero-shoe.png') {
                setIsAnimating(true);
                setDisplayShoe('hero-shoe.png');
                setTimeout(() => {
                    setCurrentShoe('hero-shoe.png');
                    setIsAnimating(false);
                }, 600);
            }
        }
    }, [activeCategory]);

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        const handleMouseMove = (e) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 2;
            const y = (e.clientY / window.innerHeight - 0.5) * 2;
            setMousePosition({ x, y });
        };
        window.addEventListener('scroll', handleScroll);
        window.addEventListener('mousemove', handleMouseMove);
        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    const mainTextTransform = `translate(-50%, -50%) translateY(${scrollY * 0.5}px)`;
    const topTextTransform = `translateY(${scrollY * 0.4}px)`;
    const bottomTextTransform = `translateY(${scrollY * 0.6}px)`;
    const shoeWrapperTransform = `translateY(${scrollY * 0.3}px)`;
    const shoeInnerTransform = `translateX(${mousePosition.x * 20}px) translateY(${mousePosition.y * 15}px) skew(${mousePosition.x * -0.5}deg, ${mousePosition.y * 0.3}deg)`;

    return (
        <div className={styles.hero}>
            {previousText && (
                <span
                    className={`${styles.textMain} ${isCrossfading ? styles.textFadeOut : ''}`}
                    style={{ transform: mainTextTransform }}
                >
                    {previousText}
                </span>
            )}

            <span
                className={`${styles.textMain} ${isCrossfading ? styles.textFadeIn : ''}`}
                style={{ transform: mainTextTransform }}
            >
                {displayText}
            </span>

            <span className={styles.textTop} style={{ transform: topTextTransform }}>ADJUSTABLE</span>
            <span className={styles.textBottom} style={{ transform: bottomTextTransform }}>SOFT PAD</span>

            <div
                className={`${styles.shoeWrapper} ${isAnimating ? styles.animating : ''}`}
                style={{ transform: shoeWrapperTransform }}
            >
                <div className={styles.shoeInner} style={{ transform: shoeInnerTransform }}>
                    <img
                        src={require(`../assets/images/${displayShoe}`)}
                        alt="Featured Shoe"
                        className={styles.shoeImage}
                    />
                </div>
            </div>

            <div className={styles.gradientFade}></div>
        </div>
    );
};

export default HeroSection;
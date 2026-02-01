import React from 'react';
import styles from './Footer.module.css';

const Footer = ({ hideFeatures }) => {
    return (
        <>
            {!hideFeatures && <div className={styles.features}>
                <div className={styles.feature}>
                    <div className={styles.featureIcon}>
                        <img src={require('../assets/images/features/delivery.png')} alt="Delivery" />
                    </div>
                    <h3>FREE AND FAST DELIVERY</h3>
                    <p>Free delivery for all orders over $140</p>
                </div>
                <div className={styles.feature}>
                    <div className={styles.featureIcon}>
                        <img src={require('../assets/images/features/customer-service.png')} alt="Service" />
                    </div>
                    <h3>24/7 CUSTOMER SERVICE</h3>
                    <p>Friendly 24/7 customer support</p>
                </div>
                <div className={styles.feature}>
                    <div className={styles.featureIcon}>
                        <img src={require('../assets/images/features/money-back.png')} alt="Guarantee" />
                    </div>
                    <h3>MONEY BACK GUARANTEE</h3>
                    <p>We return money within 30 days</p>
                </div>
            </div>}

            <footer className={styles.footer}>
                <div className={styles.footerContent}>
                    <img
                        src={require('../assets/images/icons/logo-white.png')}
                        alt="Logo"
                        className={styles.footerLogo}
                    />
                    <div className={styles.address}>
                        <h4>Address:</h4>
                        <p>USA, California</p>
                    </div>
                    <div className={styles.contact}>
                        <h4>Contact:</h4>
                        <a href="tel:18001234567">1800 123 4567</a>
                        <a href="mailto:javaria.y2b@gmail.com">javaria.y2b@gmail.com</a>
                    </div>
                    <div className={styles.socials}>
                        <a href="#"><img src={require('../assets/images/social/facebook.png')} alt="Facebook" /></a>
                        <a href="#"><img src={require('../assets/images/social/instagram.png')} alt="Instagram" /></a>
                        <a href="#"><img src={require('../assets/images/social/twitter.png')} alt="Twitter" /></a>
                        <a href="#"><img src={require('../assets/images/social/linkedin.png')} alt="LinkedIn" /></a>
                        <a href="#"><img src={require('../assets/images/social/youtube.png')} alt="YouTube" /></a>
                    </div>
                </div>
                <div className={styles.copyright}>
                    <p>© 2023 Javaria. All rights reserved.</p>
                </div>
            </footer>
        </>
    );
};

export default Footer;
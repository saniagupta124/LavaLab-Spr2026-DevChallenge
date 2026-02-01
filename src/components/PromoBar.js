import React, { useState, useEffect } from 'react';
import styles from './PromoBar.module.css';

const PromoBar = () => {
    const [currentText, setCurrentText] = useState(0);
    const [animPhase, setAnimPhase] = useState('idle');

    const messages = [
        "New here? Save 20% with code: YR24",
        "Shop our new arrivals today!"
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setAnimPhase('exit');

            setTimeout(() => {
                setCurrentText(prev => (prev + 1) % messages.length);
                setAnimPhase('enter');

                setTimeout(() => {
                    setAnimPhase('idle');
                }, 380);
            }, 380);
        }, 2800);

        return () => clearInterval(interval);
    }, []);

    let className = styles.text;
    if (animPhase === 'exit') className += ` ${styles.exit}`;
    if (animPhase === 'enter') className += ` ${styles.enter}`;

    return (
        <div className={styles.promoBar}>
            <div className={styles.textContainer}>
                <span className={className}>
                    {messages[currentText]}
                </span>
            </div>
        </div>
    );
};

export default PromoBar;
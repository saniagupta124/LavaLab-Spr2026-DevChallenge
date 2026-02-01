import React from 'react';
import { Navigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import PromoBar from '../components/PromoBar';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import SidePanel from '../components/SidePanel';
import styles from './AccountPage.module.css';

const AccountPage = () => {
    const { user } = useApp();

    if (!user) {
        return <Navigate to="/" replace />;
    }

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Good Morning';
        if (hour < 16) return 'Good Afternoon';
        return 'Good Evening';
    };

    return (
        <div>
            <PromoBar />
            <Navigation />

            <div className={styles.container}>
                <div className={styles.header}>
                    <h1>{getGreeting()}, {user.firstName}</h1>
                </div>

                <div className={styles.content}>
                    <div className={styles.section}>
                        <h2>Your Profile</h2>
                        <div className={styles.profileBox}>
                            <div className={styles.profileDetails}>
                                <div className={styles.detailRow}>
                                    <span className={styles.label}>Email:</span>
                                    <span className={styles.value}>{user.email}</span>
                                </div>
                                <div className={styles.detailRow}>
                                    <span className={styles.label}>First Name:</span>
                                    <span className={styles.value}>{user.firstName}</span>
                                </div>
                                <div className={styles.detailRow}>
                                    <span className={styles.label}>Last Name:</span>
                                    <span className={styles.value}>{user.lastName}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={styles.section}>
                        <h2>Your Orders</h2>
                        <div className={styles.emptyBox}>
                            <p>You currently don't have any purchases.</p>
                        </div>
                    </div>
                </div>
            </div>

            <Footer hideFeatures />
            <SidePanel />
        </div>
    );
};

export default AccountPage;
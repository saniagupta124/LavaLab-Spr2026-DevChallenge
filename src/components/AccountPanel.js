import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import styles from './AccountPanel.module.css';

const API = 'http://localhost:3001/api';

const EyeIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z" />
        <circle cx="12" cy="12" r="3" />
    </svg>
);

const EyeOffIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z" />
        <circle cx="12" cy="12" r="3" />
        <line x1="3" y1="21" x2="21" y2="3" />
    </svg>
);

const AccountPanel = () => {
    const { user, login, logout, closeSidePanel } = useApp();
    const navigate = useNavigate();
    const [view, setView] = useState('email');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleEmailSubmit = async (e) => {
        e.preventDefault();
        if (!email) { setError('Please enter your email'); return; }
        setLoading(true);
        setError('');
        try {
            const res = await fetch(`${API}/check-email`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });
            const data = await res.json();
            setView(data.exists ? 'login' : 'signup');
        } catch {
            setError('Server error. Is the server running?');
        }
        setLoading(false);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const res = await fetch(`${API}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
            if (!res.ok) {
                const data = await res.json();
                setError(data.error);
                setLoading(false);
                return;
            }
            const user = await res.json();
            login(user);
            closeSidePanel();
        } catch {
            setError('Server error. Is the server running?');
        }
        setLoading(false);
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        if (!firstName || !lastName || !password) {
            setError('Please fill in all fields');
            return;
        }
        setLoading(true);
        setError('');
        try {
            const res = await fetch(`${API}/signup`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password, firstName, lastName }),
            });
            if (!res.ok) {
                const data = await res.json();
                setError(data.error);
                setLoading(false);
                return;
            }
            const user = await res.json();
            login(user);
            closeSidePanel();
        } catch {
            setError('Server error. Is the server running?');
        }
        setLoading(false);
    };

    const goToAccountPage = () => {
        closeSidePanel();
        navigate('/account');
    };

    if (user) {
        return (
            <div>
                <div className={styles.panelHeader}>
                    <h2 className={styles.panelTitle}>Account</h2>
                    <button className={styles.closeButton} onClick={closeSidePanel}>×</button>
                </div>
                <div className={styles.panelContent}>
                    <div className={styles.userInfo}>
                        <h3>Hello, {user.firstName}!</h3>
                        <p className={styles.userEmail}>{user.email}</p>
                        <div className={styles.quickLinks}>
                            <button className={styles.linkButton} onClick={goToAccountPage}>
                                <span className="animated-underline">See Full Details</span>
                            </button>
                        </div>
                        <button className={styles.logoutButton} onClick={logout}>Logout</button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div>
            <div className={styles.panelHeader}>
                <h2 className={styles.panelTitle}>Account</h2>
                <button className={styles.closeButton} onClick={closeSidePanel}>×</button>
            </div>
            <div className={styles.panelContent}>
                {view === 'email' && (
                    <form onSubmit={handleEmailSubmit} className={styles.form}>
                        <h3>Enter your email</h3>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={styles.input}
                            placeholder="your@email.com"
                            required
                        />
                        {error && <p className={styles.error}>{error}</p>}
                        <button type="submit" className={styles.submitButton} disabled={loading}>
                            {loading ? 'Checking...' : 'Continue'}
                        </button>
                    </form>
                )}

                {view === 'login' && (
                    <form onSubmit={handleLogin} className={styles.form}>
                        <h3>Enter password</h3>
                        <input type="email" value={email} className={styles.input} disabled />
                        <div className={styles.passwordWrapper}>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className={styles.input}
                                placeholder="Password"
                                required
                            />
                            <button type="button" className={styles.eyeButton} onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                            </button>
                        </div>
                        {error && <p className={styles.error}>{error}</p>}
                        <button type="submit" className={styles.submitButton} disabled={loading}>
                            {loading ? 'Logging in...' : 'Log in'}
                        </button>
                        <button type="button" className={styles.backButton} onClick={() => { setView('email'); setError(''); setShowPassword(false); }}>
                            ← Back
                        </button>
                    </form>
                )}

                {view === 'signup' && (
                    <form onSubmit={handleSignup} className={styles.form}>
                        <h3>Create account</h3>
                        <input type="email" value={email} className={styles.input} disabled />
                        <input
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className={styles.input}
                            placeholder="First Name"
                            required
                        />
                        <input
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className={styles.input}
                            placeholder="Last Name"
                            required
                        />
                        <div className={styles.passwordWrapper}>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className={styles.input}
                                placeholder="Password"
                                required
                            />
                            <button type="button" className={styles.eyeButton} onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                            </button>
                        </div>
                        {error && <p className={styles.error}>{error}</p>}
                        <button type="submit" className={styles.submitButton} disabled={loading}>
                            {loading ? 'Creating...' : 'Sign up'}
                        </button>
                        <button type="button" className={styles.backButton} onClick={() => { setView('email'); setError(''); setShowPassword(false); }}>
                            ← Back
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default AccountPanel;
import React, { createContext, useState, useEffect, useContext } from 'react';

const AppContext = createContext();
const API = 'http://localhost:3001/api';

export const useApp = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [cart, setCart] = useState([]);
    const [likes, setLikes] = useState([]);
    const [sidePanelOpen, setSidePanelOpen] = useState(null);
    const [heroCategory, setHeroCategory] = useState(null);

    // Restore user from localStorage 
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const parsed = JSON.parse(storedUser);
            setUser(parsed);
            setCart(parsed.cart || []);
            setLikes(parsed.likes || []);
        }
    }, []);

    useEffect(() => {
        if (user) {
            localStorage.setItem('user', JSON.stringify({ ...user, cart, likes }));
            try {
                fetch(`${API}/save-cart`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email: user.email, cart }),
                });
            } catch { }
        }
    }, [cart]);

    useEffect(() => {
        if (user) {
            localStorage.setItem('user', JSON.stringify({ ...user, cart, likes }));
            try {
                fetch(`${API}/save-likes`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email: user.email, likes }),
                });
            } catch { }
        }
    }, [likes]);

    const addToCart = (product) => {
        const existingItem = cart.find(item => item.id === product.id);
        if (existingItem) {
            setCart(cart.map(item =>
                item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
            ));
        } else {
            setCart([...cart, { ...product, quantity: 1 }]);
        }
    };

    const removeFromCart = (productId) => {
        setCart(cart.filter(item => item.id !== productId));
    };

    const updateCartQuantity = (productId, quantity) => {
        if (quantity <= 0) {
            removeFromCart(productId);
        } else {
            setCart(cart.map(item =>
                item.id === productId ? { ...item, quantity } : item
            ));
        }
    };

    const toggleLike = (product) => {
        const liked = likes.find(item => item.id === product.id);
        if (liked) {
            setLikes(likes.filter(item => item.id !== product.id));
        } else {
            setLikes([...likes, product]);
        }
    };

    const isLiked = (productId) => {
        return likes.some(item => item.id === productId);
    };

    const login = (userData) => {
        setUser(userData);
        setCart(userData.cart || []);
        setLikes(userData.likes || []);
        localStorage.setItem('user', JSON.stringify(userData));
    };

    const logout = () => {
        setUser(null);
        setCart([]);
        setLikes([]);
        localStorage.removeItem('user');
    };

    const openSidePanel = (panel) => setSidePanelOpen(panel);
    const closeSidePanel = () => setSidePanelOpen(null);

    const getCartTotal = () => {
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    const getCartCount = () => {
        return cart.reduce((total, item) => total + item.quantity, 0);
    };

    return (
        <AppContext.Provider value={{
            user, cart, likes, sidePanelOpen, heroCategory,
            addToCart, removeFromCart, updateCartQuantity,
            toggleLike, isLiked, login, logout,
            openSidePanel, closeSidePanel, getCartTotal, getCartCount, setHeroCategory
        }}>
            {children}
        </AppContext.Provider>
    );
};
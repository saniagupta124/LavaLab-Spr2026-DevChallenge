const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');
const net = require('net');

const app = express();
const DB_PATH = path.join(__dirname, 'users.json');
const SALT_ROUNDS = 10;

app.use(cors());
app.use(express.json());

const readUsers = () => {
    if (!fs.existsSync(DB_PATH)) fs.writeFileSync(DB_PATH, '[]');
    return JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));
};

const writeUsers = (users) => {
    fs.writeFileSync(DB_PATH, JSON.stringify(users, null, 2));
};

const getUser = (email) => readUsers().find(u => u.email === email);

// --- POST /api/check-email ---
app.post('/api/check-email', (req, res) => {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: 'Email is required' });
    const exists = readUsers().some(u => u.email === email);
    res.json({ exists });
});

// --- POST /api/signup ---
app.post('/api/signup', async (req, res) => {
    const { email, password, firstName, lastName } = req.body;
    if (!email || !password || !firstName || !lastName) {
        return res.status(400).json({ error: 'All fields are required' });
    }
    const users = readUsers();
    if (users.some(u => u.email === email)) {
        return res.status(400).json({ error: 'Email already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    users.push({ email, password: hashedPassword, firstName, lastName, cart: [], likes: [] });
    writeUsers(users);
    res.json({ email, firstName, lastName, cart: [], likes: [] });
});

// --- POST /api/login ---
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }
    const user = getUser(email);
    if (!user) {
        return res.status(401).json({ error: 'Invalid email or password' });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
        return res.status(401).json({ error: 'Invalid email or password' });
    }
    res.json({ email: user.email, firstName: user.firstName, lastName: user.lastName, cart: user.cart || [], likes: user.likes || [] });
});

// --- POST /api/save-cart ---
app.post('/api/save-cart', (req, res) => {
    const { email, cart } = req.body;
    if (!email) return res.status(400).json({ error: 'Email is required' });
    const users = readUsers();
    const user = users.find(u => u.email === email);
    if (!user) return res.status(401).json({ error: 'User not found' });
    user.cart = cart || [];
    writeUsers(users);
    res.json({ success: true });
});

// --- POST /api/save-likes ---
app.post('/api/save-likes', (req, res) => {
    const { email, likes } = req.body;
    if (!email) return res.status(400).json({ error: 'Email is required' });
    const users = readUsers();
    const user = users.find(u => u.email === email);
    if (!user) return res.status(401).json({ error: 'User not found' });
    user.likes = likes || [];
    writeUsers(users);
    res.json({ success: true });
});

const findOpenPort = (startPort) => {
    return new Promise((resolve) => {
        const server = net.createServer();
        server.once('error', () => findOpenPort(startPort + 1).then(resolve));
        server.once('listening', () => {
            const port = server.address().port;
            server.close(() => resolve(port));
        });
        server.listen(startPort);
    });
};

findOpenPort(3001).then((port) => {
    app.listen(port, () => {
        fs.writeFileSync(path.join(__dirname, 'port.txt'), port.toString());
        console.log(`Server running on http://localhost:${port}`);
    });
});
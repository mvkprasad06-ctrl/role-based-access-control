require('dotenv').config();

const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const path = require('path');
const db = require('./database');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET;

// Middleware: check if user is logged in
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token.' });
    }

    req.user = user;
    next();
  });
}

// Middleware: allow only admin
function authorizeAdmin(req, res, next) {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied. Admins only.' });
  }

  next();
}

// Register route
app.post('/api/register', async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Name, email, and password are required.' });
  }

  const userRole = role === 'admin' ? 'admin' : 'user';
  const hashedPassword = await bcrypt.hash(password, 10);

  db.run(
    'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
    [name, email, hashedPassword, userRole],
    function (err) {
      if (err) {
        return res.status(400).json({ message: 'Email already exists.' });
      }

      res.status(201).json({
        message: 'User registered successfully.',
        userId: this.lastID,
        role: userRole
      });
    }
  );
});

// Login route
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  db.get('SELECT * FROM users WHERE email = ?', [email], async (err, user) => {
    if (err) {
      return res.status(500).json({ message: 'Database error.' });
    }

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    const token = jwt.sign(
      {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({
      message: 'Login successful.',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  });
});

// Protected user dashboard route
app.get('/api/dashboard', authenticateToken, (req, res) => {
  res.json({
    message: `Welcome ${req.user.name}. You have access to the user dashboard.`,
    user: req.user
  });
});

// Protected admin-only route
app.get('/api/admin', authenticateToken, authorizeAdmin, (req, res) => {
  db.all('SELECT id, name, email, role, created_at FROM users', [], (err, users) => {
    if (err) {
      return res.status(500).json({ message: 'Database error.' });
    }

    res.json({
      message: 'Welcome Admin. You can view all users.',
      users
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

process.stdin.resume();

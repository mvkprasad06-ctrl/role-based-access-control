const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');

const db = new sqlite3.Database('./rbac.db', (err) => {
  if (err) {
    console.error('Database connection error:', err.message);
  } else {
    console.log('Connected to SQLite database');
  }
});

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      role TEXT NOT NULL DEFAULT 'user',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  const adminPassword = bcrypt.hashSync('Admin@123', 10);
  const userPassword = bcrypt.hashSync('User@123', 10);

  db.run(
    `INSERT OR IGNORE INTO users (name, email, password, role) VALUES (?, ?, ?, ?)`,
    ['Admin User', 'admin@example.com', adminPassword, 'admin']
  );

  db.run(
    `INSERT OR IGNORE INTO users (name, email, password, role) VALUES (?, ?, ?, ?)`,
    ['Normal User', 'user@example.com', userPassword, 'user']
  );
});

module.exports = db;

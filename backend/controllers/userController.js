const db = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
  try {
    const { name, email, password, address, role_id } = req.body;
    console.log(address);
    
    const [existing] = await db.query('SELECT id FROM users WHERE email = ?', [email]);
    if (existing.length > 0) return res.status(409).json({ error: 'Email already in use' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await db.query(
      'INSERT INTO users (name, email, password, address, role_id) VALUES (?, ?, ?, ?, ?)',
      [name, email, hashedPassword, address, role_id]
    );
    res.status(201).json({ message: 'User created', userId: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const [users] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    if (users.length === 0) return res.status(404).json({ error: 'User not found' });

    const user = users[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: 'Invalid password' });

    const payload = { id: user.id, name: user.name, email: user.email, role_id: user.role_id, address: user.address };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });

    res.json({ message: 'Login successful', token, user: payload });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT users.id, users.name, users.email, users.address, roles.name AS role 
      FROM users JOIN roles ON users.role_id = roles.id
    `);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [id]);
    res.json(rows[0] || {});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getTokenRefresh = async (req, res)=>{
 try {
    let user = req.user;
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

exports.getStores = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT 
        s.id,
        s.name,
        s.address,
        s.owner_id,
        COALESCE(AVG(r.rating), 0) AS average_rating,
        COUNT(r.id) AS total_ratings
      FROM 
        stores s
      LEFT JOIN 
        ratings r ON s.id = r.store_id
      GROUP BY 
        s.id, s.name, s.address, s.owner_id
    `);

    res.status(200).json(rows);
  } catch (err) {
    console.error("Error fetching stores:", err);
    res.status(500).json({ error: err.message });
  }
};


exports.rateStore = async (req, res) => {
  const { store_id, user_id, rating, comment } = req.body;

  if (!store_id || !user_id || !rating) {
    return res.status(400).json({ error: "store_id, user_id, and rating are required" });
  }

  try {
    const [existing] = await db.query(
      "SELECT id FROM ratings WHERE store_id = ? AND user_id = ?",
      [store_id, user_id]
    );

    if (existing.length > 0) {
      await db.query(
        "UPDATE ratings SET rating = ?, comment = ?, updated_at = NOW() WHERE store_id = ? AND user_id = ?",
        [rating, comment || null, store_id, user_id]
      );
      return res.status(200).json({ message: "Rating updated successfully" });
    } else {
      await db.query(
        "INSERT INTO ratings (store_id, user_id, rating, comment) VALUES (?, ?, ?, ?)",
        [store_id, user_id, rating, comment || null]
      );
      return res.status(201).json({ message: "Rating submitted successfully" });
    }
  } catch (err) {
    console.error("Error saving rating:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
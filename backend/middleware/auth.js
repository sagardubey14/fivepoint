require('dotenv').config();
const jwt = require('jsonwebtoken');

exports.authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;  
  if (!authHeader?.startsWith('Bearer ')) return res.status(401).json({ error: 'No token provided' });

  const token = authHeader.split(' ')[1];
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    res.status(403).json({ error: 'Invalid or expired token' });
  }
};

exports.isAdmin = (req, res, next) => {
  if (req.user?.role_id === 1) return next();
  res.status(403).json({ error: 'Admin access required' });
};

const db = require('../config/db');

exports.getAllStores = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT * from stores`);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

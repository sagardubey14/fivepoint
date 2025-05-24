const db = require('../config/db.js');

exports.getStats = async (req, res) => {
  try {
    const [usersResult] = await db.query(`SELECT COUNT(*) AS totalUsers FROM users`);
    const [storesResult] = await db.query(`SELECT COUNT(*) AS totalStores FROM stores`);
    const [ratingsResult] = await db.query(`SELECT COUNT(*) AS totalRatings FROM ratings`);

    res.status(200).json({
      totalUsers: usersResult[0].totalUsers,
      totalStores: storesResult[0].totalStores,
      totalRatings: ratingsResult[0].totalRatings,
    });
  } catch (error) {
    console.error("Error fetching stats:", error);
    res.status(500).json({ error: "Failed to retrieve stats" });
  }
};

exports.addStore = async (req, res) => {
  const { name, address, owner_id } = req.body;

  if (!name || !address || !owner_id) {
    return res.status(400).json({ error: "name, address, and owner_id are required" });
  }

  try {
    const [result] = await db.query(
      `INSERT INTO stores (name, address, owner_id) VALUES (?, ?, ?)`,
      [name, address, owner_id]
    );
    res.status(201).json({ message: "Store added successfully", storeId: result.insertId });
  } catch (error) {
    console.error("Error adding store:", error);
    res.status(500).json({ error: "Failed to add store" });
  }
};
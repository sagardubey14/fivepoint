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
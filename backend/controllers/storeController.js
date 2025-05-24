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

exports.getStoresByOwner = async (req, res) => {
  const ownerId = req.params.id;

  try {
    const [stores] = await db.query(
      `SELECT id, name, address FROM stores WHERE owner_id = ?`,
      [ownerId]
    );

    const enrichedStores = await Promise.all(
      stores.map(async (store) => {
        const [avgResult] = await db.query(
          `SELECT AVG(rating) as average_rating FROM ratings WHERE store_id = ?`,
          [store.id]
        );
        const average_rating = avgResult[0]?.average_rating || 0;

        const [ratedUsers] = await db.query(
          `SELECT users.id, users.name, ratings.rating
           FROM ratings
           JOIN users ON ratings.user_id = users.id
           WHERE ratings.store_id = ?`,
          [store.id]
        );

        return {
          ...store,
          average_rating: parseFloat(average_rating.toFixed(1)),
          ratedUsers,
        };
      })
    );

    res.json(enrichedStores);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch owner stores" });
  }
};

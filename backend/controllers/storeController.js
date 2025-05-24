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
          average_rating: parseFloat(Number(average_rating).toFixed(1)),
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


exports.getStoreRating = async (req, res) => {
  const userId = req.query.user_id;

  if (!userId) {
    return res.status(400).json({ error: "user_id is required in query parameters" });
  }

  try {
    const [storeResult] = await db.query(
      `SELECT id FROM stores WHERE owner_id = ? LIMIT 1`,
      [userId]
    );

    if (storeResult.length === 0) {
      return res.status(404).json({ error: "No store found for this user" });
    }

    const storeId = storeResult[0].id;

    const [ratingResult] = await db.query(
      `SELECT AVG(rating) AS average_rating FROM ratings WHERE store_id = ?`,
      [storeId]
    );

    const average_rating = ratingResult[0]?.average_rating || 0;

    res.json({
      store_id: storeId,
      average_rating: parseFloat(Number(average_rating).toFixed(1)),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch store rating" });
  }
};

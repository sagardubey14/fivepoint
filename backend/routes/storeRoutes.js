const express = require('express');
const router = express.Router();

const { authenticate, isAdmin } = require('../middleware/auth');
const { getAllStores, getStoresByOwner, getStoreRating } = require('../controllers/storeController');

router.get('/getallstores', authenticate, isAdmin, getAllStores);
router.get('/getstorerating', getStoreRating);
router.get('/:id', getStoresByOwner);


module.exports = router;
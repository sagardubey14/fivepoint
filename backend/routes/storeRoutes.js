const express = require('express');
const router = express.Router();

const { authenticate, isAdmin } = require('../middleware/auth');
const { getAllStores, getStoresByOwner } = require('../controllers/storeController');

router.get('/getallstores', authenticate, isAdmin, getAllStores);
router.get('/:id', getStoresByOwner);


module.exports = router;
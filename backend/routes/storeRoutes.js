const express = require('express');
const router = express.Router();

const { authenticate, isAdmin } = require('../middleware/auth');
const { getAllStores } = require('../controllers/storeController');

router.get('/getallstores', authenticate, isAdmin, getAllStores);

module.exports = router;
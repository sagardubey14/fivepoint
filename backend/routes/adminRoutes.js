const express = require('express');
const router = express.Router();

const { authenticate, isAdmin } = require('../middleware/auth');
const { getStats, addStore } = require('../controllers/adminController');

router.get('/getstats', authenticate, isAdmin, getStats);
router.post('/addstore', authenticate, isAdmin, addStore);

module.exports = router;
const express = require('express');
const router = express.Router();

const { authenticate, isAdmin } = require('../middleware/auth');
const { getStats } = require('../controllers/adminController');

router.get('/getstats', authenticate, isAdmin, getStats);

module.exports = router;
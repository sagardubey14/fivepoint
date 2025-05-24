const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authenticate, isAdmin } = require('../middleware/auth');

router.post('/signup', userController.signup);
router.post('/login', userController.login);

router.get('/tokendata', authenticate, userController.getTokenRefresh)
router.get('/', authenticate, isAdmin, userController.getAllUsers);
router.get('/:id', authenticate, isAdmin, userController.getUserById);

module.exports = router;

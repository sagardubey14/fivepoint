const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authenticate, isAdmin } = require('../middleware/auth');

router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.get('/getstores', userController.getStores);

router.get('/tokendata', authenticate, userController.getTokenRefresh)
router.post('/updatepass', authenticate, userController.updatePass)
router.post('/rate', authenticate, userController.rateStore)
router.get('/', authenticate, isAdmin, userController.getAllUsers);
router.get('/:id', authenticate, isAdmin, userController.getUserById);

module.exports = router;

const express = require('express');
const router = express.Router();
const userController = require('../controllers/user-controller');
const authenticateToken = require('../middlewares/auth-middleware');

router.get('/profile', authenticateToken, userController.getUserProfile);

module.exports = router;
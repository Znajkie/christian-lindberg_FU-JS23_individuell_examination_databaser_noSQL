const express = require('express');
const router = express.Router();
const userController = require('../controllers/usersControllers');
const { auth } = require('../utils/auth');

// Create user
router.post('/register', userController.createUser);

// Login user / admin
router.post('/login', userController.loginUser);

// Adding auth with JWT to all requests except register and login.
router.use(auth);

// Read all users
router.get('/', userController.getAllUsers);

// Get user by ID
router.get('/:id', userController.getUserById);

// Update user
router.put('/:id', userController.updateUser);

// Delete user
router.delete('/:id', userController.deleteUser);

module.exports = router;

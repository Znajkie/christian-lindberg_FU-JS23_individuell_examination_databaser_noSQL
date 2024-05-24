const express = require('express');
const router = express.Router();
const userController = require('../controllers/usersControllers');

// Create user
router.post('/', userController.createUser);

// Read all users
router.get('/', userController.getAllUsers);

// Get user by ID
router.get('/:id', userController.getUserById);

// Update user
router.put('/:id', userController.updateUser);

// Delete user
router.delete('/:id', userController.deleteUser);

module.exports = router;

const mongoose = require('mongoose');
const User = require('../models/userSchema');
const jwt = require('jsonwebtoken');

// Create user
exports.createUser = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find the user with the provided username
    const user = await User.findOne({ username: username });
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: 'Invalid username' });
    }
    console.log(username);
    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: '3h',
    });

    // Send the token back in the response
    res.status(200).json({ success: true, token });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

//* Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    if (!users) {
      res.status(400).send('No user found');
      return;
    }
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send(error);
  }
};

//* Get user by ID
exports.getUserById = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      res.status(400).send('Not valid ID');
      return;
    }

    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404).send('User not found');
      return;
    }
    res.status(200).send(user);
  } catch (error) {
    console.error('Error in getUserById:', error);
    res.status(500).send(error);
  }
};

//* Update user
exports.updateUser = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['username', 'password', 'email'];
  const isValidKeys = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidKeys) {
    res.status(400).send('Invalid update fields');
    return;
  }
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404).send('User not found');
      return;
    }
    updates.forEach((update) => (user[update] = req.body[update]));
    await user.save();
    res.status(200).send(`User updated: ${user}`);
  } catch (error) {
    res.status(500).send(error);
  }
};

//* Delete user
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      res.status(400).send('ID not found');
      return;
    }
    res.status(200).send(`User deleted: ${user}`);
  } catch (error) {
    res.status(400).send(error);
  }
};
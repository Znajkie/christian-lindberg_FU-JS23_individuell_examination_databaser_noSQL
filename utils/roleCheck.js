const User = require('../models/userSchema');

const isAdmin = async (req, res, next) => {
  const userId = req.header('userId');
  if (!userId) {
    return res.status(401).send('User ID is required');
  }

  try {
    const user = await User.findById(userId);
    if (!user || user.role != 'admin')
      res.status(403).send('Forbidden');
      next()
      
  } catch (error) {
    res.status(500).send('Server error');
  }
};

module.exports = isAdmin;
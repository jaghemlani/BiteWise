const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

const generateToken = (user) => {
  return jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

const login = async (username, password) => {
  const user = await User.findOne({ username });
  if (!user) {
    throw new Error('User not found');
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Invalid credentials');
  }

  return generateToken(user);
};

const signUp = async (username, email, password) => {
  const user = new User({ username, email, password: await bcrypt.hash(password, 12) });
  await user.save();
  return generateToken(user);
};

module.exports = { login, signUp };

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { User } = require('../models/user');

const { ctrlWrapper, HttpError } = require('../helpers');

const { JWT_SECRET } = process.env;

// Registration

const registerUser = async (req, res) => {
  const { password, email } = req.body;
  const user = await User.findOne({ email }).exec();

  if (user) {
    throw HttpError(409, 'Email in use');
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const newUser = await User.create({ ...req.body, password: passwordHash });
  res.status(201).json({
    user: { email: newUser.email, subscription: newUser.subscription },
  });
};

// Login

const loginUser = async (req, res) => {
  const { password, email } = req.body;
  const user = await User.findOne({ email }).exec();

  if (!user) {
    throw HttpError(401, 'Email or password is wrong');
  }

  const passwordCompare = await bcrypt.compare(password, user.password);

  if (!passwordCompare) {
    throw HttpError(401, 'Email or password is wrong');
  }

  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '24h' }); // token expires in 24 hours

  await User.findByIdAndUpdate(user._id, { token }).exec();

  res.status(200).json({
    token,
    user: { email: user.email, subscription: user.subscription },
  });
};

// Logout

const logoutUser = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: null }).exec();
  res.status(204).json({
    message: 'Logout success',
  });
};

// Current user
const getCurrentUser = async (req, res) => {
  const { email, subscription } = req.user;
  res.status(200).json({ email, subscription });
};

// Subscription

const subscribeUser = async (req, res) => {
  const { _id } = req.user;
  const { subscription } = req.body;

  const updatedUser = await User.findByIdAndUpdate(
    _id,
    { subscription },
    { new: true }
  ).exec();
  if (updatedUser === null) {
    throw HttpError(404);
  }

  res.status(200).json({
    user: {
      email: updatedUser.email,
      subscription: updatedUser.subscription,
    },
  });
};

module.exports = {
  registerUser: ctrlWrapper(registerUser),
  loginUser: ctrlWrapper(loginUser),
  logoutUser: ctrlWrapper(logoutUser),
  getCurrentUser: ctrlWrapper(getCurrentUser),
  subscribeUser: ctrlWrapper(subscribeUser),
};
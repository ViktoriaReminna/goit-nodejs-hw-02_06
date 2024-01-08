const express = require('express');

const {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
  subscribeUser,
  uploadAvatar,
  verifyEmail,
  resendVerifyEmail,
} = require('../controllers/auth');

const { validateBody, authenticate, upload } = require('../middlewares');
const { schemas } = require('../schemas/contactValidation');

const router = express.Router();
const parseJSON = express.json();

// Register a user
router.post(
  '/register',
  parseJSON,
  validateBody(schemas.registerSchema),
  registerUser
);

// Verification
router.get('/verify/:verificationToken', parseJSON, verifyEmail);

router.post(
  '/verify',
  parseJSON,
  validateBody(schemas.emailSchema),
  resendVerifyEmail
);

// Login a user
router.post('/login', parseJSON, validateBody(schemas.loginSchema), loginUser);

// Logout a user
router.post('/logout', parseJSON, authenticate, logoutUser);

// Current user
router.get('/current', parseJSON, authenticate, getCurrentUser);

// Update a user subscription

router.patch(
  '/',
  parseJSON,
  authenticate,
  validateBody(schemas.subscriptionSchema),
  subscribeUser
);
// Upload user avatar
router.patch(
  '/avatars',
  parseJSON,
  authenticate,
  upload.single('avatar'),
  uploadAvatar
);
module.exports = router;

const express = require('express');
const router = express.Router();
const profileController = require('../controller/ProfileController');

router.post(
  '/post', 
  profileController.uploadAvatar,
  profileController.createProfile
);

// Get Profile
router.get(
  '/get',profileController.getProfile
);

module.exports = router;
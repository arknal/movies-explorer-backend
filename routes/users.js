const router = require('express').Router();

const { userRouterValidation } = require('../middlewares/validation');

const { getCurrentUser, updateUserProfile } = require('../controllers/user');

router.get('/users/me', getCurrentUser);

router.patch('/users/me', userRouterValidation.patchProfileValidator, updateUserProfile);

module.exports = router;

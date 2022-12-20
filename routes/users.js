const router = require('express').Router();

const { userRouterValidation } = require('../middlewares/validation');

const authMiddleware = require('../middlewares/auth');

const { getCurrentUser, updateUserProfile } = require('../controllers/user');

router.use('/users', authMiddleware);

router.get('/users/me', getCurrentUser);

router.patch('/users/me', userRouterValidation.patchProfileValidator, updateUserProfile);

module.exports = router;

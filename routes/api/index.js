const router = require('express').Router();

const usersRoutes = require('./user-routes');
const thoughtsRoutes = require('./thought-routes');

// craete routs with /users
router.use('/users', usersRoutes);

// created routes with /thoughts
router.use('/thoughts', thoughtsRoutes);

module.exports = router;
const router = require('express').Router();
const userRoutes = require('./userRoutes');
const chatRoutes = require('./chatRoutes');
const scoreRoutes = require('./scoreRoutes');

router.use('/users', userRoutes);
router.use('/chats', chatRoutes);
router.use('/scores', scoreRoutes);

module.exports = router;

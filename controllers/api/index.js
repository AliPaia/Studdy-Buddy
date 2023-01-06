const router = require('express').Router();
const userRoutes = require('./userRoutes');
const chatRoutes = require('./chatRoutes');
const scoreRoutes = require('./scoreRoutes');
const scheduleRoutes = require('./scheduleRoutes');

router.use('/users', userRoutes);
router.use('/chats', chatRoutes);
router.use('/scores', scoreRoutes);
router.use('/schedule', scheduleRoutes);

module.exports = router;

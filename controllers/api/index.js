const router = require('express').Router();
const userRoutes = require('./userRoutes');
const chatRoutes = require('./chatRoutes');

router.use('/users', userRoutes);
router.use('/chats', chatRoutes);

module.exports = router;

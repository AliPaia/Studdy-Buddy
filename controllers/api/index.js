const router = require('express').Router();
const userRoutes = require('./userRoutes');
const chatRoutes = require('./chatRoutes');
const availabilityRoutes = require('./availabilityRoutes');
router.use('/users', userRoutes);
router.use('/chats', chatRoutes);
router.use('/availability', availabilityRoutes);
module.exports = router;

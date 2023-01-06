const router = require('express').Router();
const withAuth = require('../utils/auth');
const { searchChat } = require('../utils/query');
const { User, Score, Chat, Schedule } = require('../models');

router.get('/', async (req, res) => {
  const { loggedIn, userId } = req.session;

  let userData;

  try {
    if (loggedIn) {
      userData = await User.findByPk(userId, {
        attributes: { exclude: 'password' },
        include: { model: Score, attributes: { exclude: ['id', 'userId'] } },
        nest: true,
        raw: true,
      });
    }

    res.render('homepage', {
      loggedIn,
      userData,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/assessment', withAuth, async (req, res) => {
  try {
    res.render('assessment', {
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/chat', withAuth, async (req, res) => {
  const { userId } = req.session;
  let chatData, roomStatus;

  try {
    const userData = await User.findByPk(userId, {
      attributes: { exclude: 'password' },
      include: [{ model: Score }, { model: Chat }],
      raw: true,
      nest: true,
    });

    if (userData.isActive) {
      const chatDataArr = await searchChat(userData);
      chatData = chatDataArr[Math.floor(Math.random() * chatDataArr.length)];
      roomStatus = 'joined';
      if (!chatData) {
        // if no rooms open then join their own room
        chatData = { id: userData.chat.id };
        roomStatus = 'searching';
      }
    } else {
      await Chat.update({ isOpen: true }, { where: { userId } });
      chatData = await Chat.findOne({
        attributes: ['id', 'subject'],
        where: { userId: userData.id },
        raw: true,
      });
      roomStatus = 'created';
    }

    res.render('chat', {
      loggedIn: req.session.loggedIn,
      // update values
      ...userData,
      chatData,
      roomStatus,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

router.get('/profile', withAuth, async (req, res) => {
  const { loggedIn, userId } = req.session;
  const userData = await User.findByPk(userId, { raw: true });
  const scheduleData = await Schedule.findAll({
    where: { userId },
    order: [['date', 'DESC']],
    raw: true,
  });

  res.render('profile', { loggedIn, userData, scheduleData });
});

router.get('/user/:username', async (req, res) => {
  const { username } = req.params;
  const userData = await User.findOne({ where: { username } });
  res.render('profile', { userData });
});

module.exports = router;

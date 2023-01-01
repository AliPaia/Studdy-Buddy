const router = require('express').Router();
const withAuth = require('../utils/auth');
const { searchChat } = require('../utils/query');
const { User, Score, Chat } = require('../models');

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
      chatData =
        chatDataArr[Math.floor(Math.random() * (chatDataArr.length - 1))];
      roomStatus = 'joined';
      if (!chatData) {
        // if no rooms open then join their own room
        chatData = { id: userData.chat.id };
        roomStatus = 'searching';
      }
    } else {
      await Chat.update({ isOpen: true }, { where: { userId } });
      chatData = await Chat.findOne({
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

router.get('/profile', withAuth, (req, res) => {
  res.render('profile');
});

module.exports = router;

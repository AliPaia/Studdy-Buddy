const router = require('express').Router();
const withAuth = require('../utils/auth');
const { searchChat } = require('../utils/query');
const { User, Score, Chat } = require('../models');

router.get('/', async (req, res) => {
  const { loggedIn, userId } = req.session;

  let userData;

  try {
    if (loggedIn) {
      userData = await User.findByPk(userId);
    }

    res.render('homepage', {
      loggedIn,
      userData,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/assessment', async (req, res) => {
  try {
    res.render('assessment', {
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/chat', async (req, res) => {
  const userId = req.session.userId || 1;
  const subject = req.body.subject || 'vanillaJs' || null; // modify?
  let chatData;

  try {
    const userData = await User.findByPk(userId, {
      attributes: { exclude: 'password' },
      include: [{ model: Score }, { model: Chat }],
      raw: true,
      nest: true,
    });

    if (userData.isActive) {
      chatData = await searchChat(userData);
    } else {
      await Chat.update(
        { isOpen: true, subject, subjectScore: userData.score[subject] },
        {
          where: {
            userId: userData.id,
          },
        }
      );
      chatData = await Chat.findOne({
        where: { userId: userData.id },
        raw: true,
      });
    }

    console.log(chatData);

    res.render('chat', {
      loggedIn: req.session.loggedIn,
      // update values
      ...userData,
      chatData,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// route for testing purposes, merge with regular chat route later
router.get('/buddychat', async (req, res) => {
  const userId = req.session.userId || 2;
  const subject = req.body.subject || null;
  let chatData;

  try {
    const userData = await User.findByPk(userId, {
      attributes: { exclude: 'password' },
      include: [{ model: Score }, { model: Chat }],
      raw: true,
      nest: true,
    });
    // circumvent isActive but this is done before hitting route
    User.update({ isActive: true }, { where: { id: userData.id } });

    if (userData.isActive) {
      const chatDataArr = await searchChat(userData);
      chatData =
        chatDataArr[Math.floor(Math.random() * (chatDataArr.length - 1))];
    } else {
      chatData = await Chat.update(
        { isOpen: true, subject, subjectScore: userData.score[subject] },
        {
          where: {
            userId: userData.id,
          },
        }
      );
    }

    res.render('chat', {
      loggedIn: req.session.loggedIn,
      // update values
      ...userData,
      chatData,
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

module.exports = router;

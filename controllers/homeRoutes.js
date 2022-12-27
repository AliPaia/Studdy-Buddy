const router = require('express').Router();
const withAuth = require('../utils/auth');
const { searchChat } = require('../utils/query');
const { User, Score, Chat } = require('../models');

router.get('/', async (req, res) => {
  try {
    res.render('homepage', {
      loggedIn: req.session.loggedIn,
      isActive: req.session.isActive,
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
  // gets random user for testing purpose
  const userId = req.session.userId || Math.floor(Math.random() * 5 + 1);
  const subject = req.body.subject || 'mySql' || null; // modify?

  try {
    const userData = await User.findByPk(userId, {
      attributes: { exclude: 'password' },
      include: [
        { model: Score, attributes: [subject] },
        { model: Chat }
      ],
      raw: true,
      nest: true,
    });

    await Chat.update({ isOpen: true }, {
      where: {
        userId: userData.id,
      }
    });

    res.render('chat', {
      loggedIn: req.session.loggedIn,
      // update values
      ...userData,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// route for testing purposes
router.get('/buddychat', async (req, res) => {
  const userId = req.session.userId || Math.floor(Math.random() * 5 + 1);
  const subject = req.body.subject || 'Vanilla JS' || null; // modify?

  try {
    const userData = await User.findByPk(userId, {
      attributes: ['username', 'id'],
      include: { model: Score },
      nest: true,
      raw: true,
    });
    const isActive = true;

    if (isActive) {
      const chatData = await searchChat(userData);


    }
    
    res.render('chat', {
      loggedIn: req.session.loggedIn,
      // update values
      ...userData,
      isActive,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

module.exports = router;

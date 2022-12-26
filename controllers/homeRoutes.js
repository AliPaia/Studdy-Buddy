const router = require('express').Router();
const withAuth = require('../utils/auth');
const { User, Score } = require('../models');

router.get('/', async (req, res) => {
  try {
    res.render('homepage', {
      loggedIn: req.session.loggedIn,
      userActive: req.session.userActive,
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
  const userId = Math.floor(Math.random() * 5 + 1);
  const userActive = req.session.userActive;

  try {
    const { username } = await User.findByPk(userId, { raw: true });

    res.render('chat', {
      loggedIn: req.session.loggedIn,
      // update values
      userId,
      username,
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

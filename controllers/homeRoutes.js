const router = require('express').Router();
const withAuth = require('../utils/auth');
const { User, Score } = require('../models');

router.get('/', async (req, res) => {
  try {
    res.render('homepage', {
      // just for implementations, change later
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
      // just for implementations, change later
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/chat', async (req, res) => {
  try {
    res.render('chat', {
      loggedIn: req.session.loggedIn,
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

const router = require('express').Router();
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    res.render('homepage', {
      // just for implementations, change later
      loggedIn: true,
      userActive: true,
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

const router = require('express').Router();
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
   
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

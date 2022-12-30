const router = require('express').Router();
const withAuth = require('../../utils/auth');
const { User, Score, Chat } = require('../../models');

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const userData = await User.findOne({ where: { username } });
    if (!userData) {
      res.status(400).json({ message: 'Incorrect Username' });
      return;
    }

    const validPassword = userData.checkPassword(password);
    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect Password' });
      return;
    }

    req.session.save(() => {
      req.session.userId = userData.id;
      req.session.loggedIn = true;
      res.json({ user: userData, message: 'Logged In!' });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;

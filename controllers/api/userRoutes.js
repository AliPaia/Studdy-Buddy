const router = require('express').Router();
const withAuth = require('../../utils/auth');
const { User, Score, Chat } = require('../../models');

router.post('/', async (req, res) => {
  try {
    const userData = await User.create(req.body);
    const scoreData = await Score.create({ userId: userData.id });
    const chatData = await Chat.create({ userId: userData.id });

    req.session.save(() => {
      req.session.userId = userData.id;
      req.session.loggedIn = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(500).send(err);
  }
});

// update user isActive status
router.put('/', withAuth, async (req, res) => {
  const { userId } = req.session;
  const { isActive } = req.body;

  try {
    const response = await User.update({ isActive }, { where: { id: userId } });

    res.json(response);
  } catch (err) {
    res.status(500).send(err);
  }
});

// searches for user using provided username and logs in if password correct
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const userData = await User.findOne({ where: { username } });
    if (!userData) {
      res.status(400).json({ message: 'Something went wrong' });
      return;
    }

    const validPassword = userData.checkPassword(password);
    if (!validPassword) {
      res.status(400).json({ message: 'Something went wrong' });
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

// logs user out
router.post('/logout', async (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;

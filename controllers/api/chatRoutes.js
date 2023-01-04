const router = require('express').Router();
const withAuth = require('../../utils/auth');
const { searchChat } = require('../../utils/query');
const { User, Score, Chat } = require('../../models');

// update chat subject
router.put('/subject', withAuth, async (req, res) => {
  const { userId } = req.session;
  const { subject } = req.body;

  try {
    const scoreData = await Score.findOne({ where: { userId }, raw: true });
    const response = await Chat.update(
      { subject, subjectScore: scoreData[subject] },
      { where: { userId } }
    );

    res.json(response);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get('/matching', withAuth, async (req, res) => {
  const { userId } = req.session;
  let chatData = {};

  try {
    const userData = await User.findByPk(userId, {
      attributes: { exclude: 'password' },
      include: [{ model: Score }, { model: Chat }],
      raw: true,
      nest: true,
    });

    const chatDataArr = await searchChat(userData);

    chatData =
      chatDataArr[Math.floor(Math.random() * (chatDataArr.length - 1))];
    if (!chatData) {
      // if no rooms open then join their own room
      res.status(404).json({ message: 'no rooms found' });
    }

    res.json(chatData);
  } catch (err) {
    res.status(500).send(err);
  }
});

// user hits button to find chat

// do a fetch to chat route to see if any available that user can join
// if there isn't then make one then redirect
// if there is then join and redirect

// load chat from data ???

module.exports = router;

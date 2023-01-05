const router = require('express').Router();
const { User, Score } = require('../../models');

router.post('/', async (req, res) => {
  const { userId } = req.session;
  try {
    const score = await Score.update({ ...req.body }, { where: { userId } });
    res.status(200).json(score);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;

const router = require('express').Router();
const withAuth = require('../../utils/auth');
const { Schedule } = require('../../models');

router.get('/', async (req, res) => {
  try {
    const scheduleData = await Schedule.findAll();
    res.json(scheduleData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', withAuth, async (req, res) => {
  const { userId } = req.session;
  const { date } = req.body;
  try {
    const scheduleData = Schedule.create({ userId, date });
    res.json(scheduleData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  const { userId } = req.session;
  const { id } = req.params;

  try {
    const scheduleData = Schedule.destroy({ where: { id, userId } });
    res.json(scheduleData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

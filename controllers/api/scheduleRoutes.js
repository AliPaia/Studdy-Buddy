const router = require('express').Router();
const withAuth = require('../../utils/auth');
const { User, Schedule } = require('../../models');

router.post('/', withAuth, async (req, res) => {
  const { userId, loggedIn } = req.session;
  const { date, time } = req.body;
  console.log(date);
  console.log(time);
  try {
    const userData = await User.findByPk(userId, {
      attributes: { exclude: 'password' },
      raw: true,
      nest: true,
    });
    console.log(userData);
    const scheduleData = Schedule.create({ userId, date, time });

    res.json(scheduleData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/', (req, res) => {
  // const userId = req.session.userId || 2;
  // const loggedIn= req.session.loggedIn;
  // const userData = await User.findByPk(userId, {
  //   attributes: { exclude: 'password' },
  //   raw: true,
  //   nest: true,
  //    });
  //    console.log(userData)
  Schedule.findAll({})
    .then((data) => res.status(200).json(data))
    .catch((err) => res.json(err));
  // res.render('profile',{
  //   test, loggedIn
  // });
});

module.exports = router;

const router = require('express').Router();
const withAuth = require('../../utils/auth');
const { User, Availability } = require('../../models');


router.post('/',async (req, res) => {
    const userId = req.session.userId || 4;
    const loggedIn= req.session.loggedIn;
    const userData = await User.findByPk(userId, {
      attributes: { exclude: 'password' },
      raw: true,
      nest: true,
       });
       console.log(userData)
Availability.create({
    userId, 
    date: req.body.date,
    time: req.body.time,
})
res.send("availability created")
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
       Availability.findAll({})
     .then(data=>res.status(200).json(data))
     .catch(err=>res.json(err))
      // res.render('profile',{
      //   test, loggedIn
      // });
    });
module.exports = router;
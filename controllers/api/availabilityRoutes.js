const router = require('express').Router();
const withAuth = require('../../utils/auth');
const { User, Availability } = require('../../models');
const { request } = require('express');

router.post('/',async (req, res) => {
    const userId = req.session.userId || 2;
    const loggedIn= req.session.loggedIn;
    const userData = await User.findByPk(userId, {
      attributes: { exclude: 'password' },
      raw: true,
      nest: true,
       });
       console.log(userData)
Availability.create({
    userId, 
    availability: req.body.availability
})
res.send("availability created")
  });


module.exports = router;
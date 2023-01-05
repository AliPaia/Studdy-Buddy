const router = require('express').Router();
const { User, Score } = require('../../models');
const { UUID } = require('sequelize');

router.post('/', async (req, res) => {
   // const { userId } = req.session 
   const userId = 1
   try{
        const score = await Score.update({ ...req.body,}, {where: {
            userId
        }})
        res.status(200).json(score);
    } catch(err){
    res.status(400).json(err);
   }
  });

  module.exports = router;
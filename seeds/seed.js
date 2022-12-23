const sequelize = require('../config/connection');
const { User, Score } = require('../models');

const userData = require('./userData.json');
const scoreData = require('./scoreData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const user = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  const score = await Score.bulkCreate(scoreData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDatabase();

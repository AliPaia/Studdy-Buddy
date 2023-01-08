const sequelize = require('../config/connection');
const { User, Score, Chat, Schedule } = require('../models');

const userData = require('./userData.json');
const scoreData = require('./scoreData.json');
const chatData = require('./chatData.json');
const scheduleData = require('./scheduleData.json');

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

  const chat = await Chat.bulkCreate(chatData, {
    individualHooks: true,
    returning: true,
  });

  const schedule = await Schedule.bulkCreate(chatData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDatabase();

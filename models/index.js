const User = require('./User');
const Score = require('./Score');
const Chat = require('./Chat');
const Schedule = require('./Schedule');

User.hasOne(Score, {
  foreignKey: 'userId',
  onDelete: 'CASCADE',
});

Score.belongsTo(User, {
  foreignKey: 'userId',
});

Schedule.belongsTo(User, {
  foreignKey: 'userId',
});

User.hasOne(Chat, {
  foreignKey: 'userId',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

User.hasMany(Schedule, {
  foreignKey: 'userId',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

Chat.belongsTo(User, {
  foreignKey: 'userId',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

module.exports = { User, Score, Chat, Schedule };

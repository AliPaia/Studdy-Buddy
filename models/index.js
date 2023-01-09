const User = require('./User');
const Score = require('./Score');
const Chat = require('./Chat');
const Availability = require('./availability');

User.hasOne(Score, {
  foreignKey: 'userId',
  onDelete: 'CASCADE',
});

Score.belongsTo(User, {
  foreignKey: 'userId',
});

Availability.belongsTo(User, {
  foreignKey: 'userId',
});

User.hasOne(Chat, {
  foreignKey: 'userId',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

Chat.belongsTo(User, {
  foreignKey: 'userId',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

module.exports = { User, Score, Chat, Availability };

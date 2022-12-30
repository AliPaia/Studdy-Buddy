const User = require('./User');
const Score = require('./Score');
const Chat = require('./Chat');

User.hasOne(Score, {
  foreignKey: 'userId',
  onDelete: 'CASCADE',
});

Score.belongsTo(User, {
  foreignKey: 'userId',
});

User.hasOne(Chat, {
  foreignKey: 'userId',
  onUpdate: 'CASCADE',
});

Chat.belongsTo(User, {
  foreignKey: 'userId',
  onUpdate: 'CASCADE',
});

module.exports = { User, Score, Chat };

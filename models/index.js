const User = require('./User');
const Score = require('./Score');

User.hasOne(Score, {
  foreignKey: 'userId',
  onDelete: 'CASCADE',
});

Score.belongsTo(User, {
  foreignKey: 'userId',
});

module.exports = { User, Score };

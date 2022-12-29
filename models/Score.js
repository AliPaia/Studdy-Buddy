const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Score extends Model {}

Score.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    vanillaJs: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    mySql: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    nodeJs: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    express: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    oop: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      references: {
        model: 'user',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'score',
  }
);

module.exports = Score;

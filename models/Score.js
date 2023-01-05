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
      defaultValue: 1,
    },
    mySql: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    nodeJs: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    express: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    oop: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
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

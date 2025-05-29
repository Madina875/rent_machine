const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");

const Contract = sequelize.define(
  "contract",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    total_price: {
      type: DataTypes.STRING(50),
    },
    date: {
      type: DataTypes.STRING(50),
    },
    start_time: {
      type: DataTypes.STRING(50),
    },
    end_time: {
      type: DataTypes.STRING(50),
    },
    total_time: {
      type: DataTypes.STRING(50),
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = Contract;

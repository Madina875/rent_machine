const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");

const Payment = sequelize.define(
  "payment",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    payment_date: {
      type: DataTypes.STRING(50),
    },
    payment_status: {
      type: DataTypes.STRING(50),
    },
    amount: {
      type: DataTypes.STRING(50),
    },
    status: {
      type: DataTypes.STRING(50),
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = Payment;

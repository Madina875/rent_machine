const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");

const Review = sequelize.define(
  "review",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    rating: {
      type: DataTypes.STRING(50),
    },
    comment: {
      type: DataTypes.STRING(50),
    },
    created_at: {
      type: DataTypes.STRING(50),
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = Review;

const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");
const Users = require("./users.model");
const Machine = require("./machine.models");

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

Users.hasMany(Review);
Review.belongsTo(Users);

Machine.hasMany(Review);
Review.belongsTo(Machine);

module.exports = Review;

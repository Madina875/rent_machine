const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");
const Users = require("../models/users.model");

const Users_location = sequelize.define(
  "users_location",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(50),
    },
    address: {
      type: DataTypes.STRING(1000),
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

//bog'liqliklar:
Users.hasMany(Users_location);
Users_location.belongsTo(Users);

module.exports = Users_location;

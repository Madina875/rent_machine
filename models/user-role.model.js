const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");
const Role = require("../models/role.model");
const User = require("../models/users.model");

const User_role = sequelize.define(
  "user_role",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

User.belongsToMany(Role, {
  through: User_role,
  // foreignKey: "user_id"
});
Role.belongsToMany(User, { through: User_role });

User_role.belongsTo(User);

Role.hasMany(User_role);
User_role.belongsTo(Role);

module.exports = User_role;

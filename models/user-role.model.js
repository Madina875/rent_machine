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
User_role.belongsTo(Role);

// Role.hasMany(User_role);

module.exports = User_role;

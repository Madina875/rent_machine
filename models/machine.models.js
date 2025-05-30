const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");
const Category = require("./category.model");
const Users = require("./users.model");
const Region = require("./region.model");
const District = require("./district.model");

const Machine = sequelize.define(
  "machine",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(50),
    },
    price_per_hour: {
      type: DataTypes.DECIMAL,
    },
    description: {
      type: DataTypes.STRING(100),
    },
    is_available: {
      type: DataTypes.BOOLEAN,
    },
    created_at: {
      type: DataTypes.STRING(50),
    },
    min_hour: {
      type: DataTypes.STRING(50),
    },
    min_price: {
      type: DataTypes.DECIMAL(15, 2),
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

Category.hasMany(Machine);
Machine.belongsTo(Category);

Users.hasMany(Machine);
Machine.belongsTo(Users);

Region.hasMany(Machine);
Machine.belongsTo(Region);

District.hasMany(Machine);
Machine.belongsTo(District);

module.exports = Machine;

// promise purefunction inpurefunction
// primitiv noprimitiv datatypes
// workerlar va cluster
// type script generic type lar nima
// databases
// agregat funksiyalar
//interseptor
// deploy qilish konteynerlash
//firewall nima

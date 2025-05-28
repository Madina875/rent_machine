const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");
const Machine = require("./machine.models");

const Image = sequelize.define(
  "image",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    image_url: {
      type: DataTypes.STRING(200),
    },
    uploaded_at: {
      type: DataTypes.STRING(200),
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

Machine.hasMany(Image);
Image.belongsTo(Machine);

module.exports = Image;

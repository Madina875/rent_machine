const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");

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
    machine_id: {
      type: DataTypes.INTEGER,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = Image;

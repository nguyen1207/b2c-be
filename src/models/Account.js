const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

const Account = sequelize.define(
  "Account",
  {
    email: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      values: ["Customer", "Agent", "Admin"],
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "account",
    timestamps: false,
  }
);

module.exports = Account;

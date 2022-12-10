const { ACCOUNT_TYPE } = require("../utils/constants");

module.exports = (sequelize, DataTypes) => {
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
        type: DataTypes.INTEGER,
        allowNull: false,
        values: [ACCOUNT_TYPE.AGENT, ACCOUNT_TYPE.CUSTOMER, ACCOUNT_TYPE.ADMIN],
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.BIGINT,
      },
      updatedAt: {
        type: DataTypes.BIGINT,
      },
    },
    {
      underscored: true,
      timestamps: false,
      tableName: "Account",
    }
  );

  return Account;
};

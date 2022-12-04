const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("supplement_facts", "nguyen", "123", {
  host: "localhost",
  dialect: "mssql",
  dialectOptions: {
    options: {
      encrypt: false,
      trustServerCertificate: true,
    },
  },
});

module.exports = sequelize;

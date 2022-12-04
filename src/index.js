const express = require("express");
const sequelize = require("./config/sequelize");
const route = require("./routes/index");

const app = express();
const port = 8080;

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");

    route(app);

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
    process.exit(1);
  });

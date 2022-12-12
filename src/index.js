require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./models");
const route = require("./routes/index");
const passport = require("./config/passport");

const app = express();
const port = 8080;

db.sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");

    app.use(cors());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use(passport.initialize());

    route(app);

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
    process.exit(1);
  });

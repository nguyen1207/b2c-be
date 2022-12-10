const { Op } = require("sequelize");
const createHttpError = require("http-errors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { ACCOUNT_TYPE } = require("../utils/constants");
const db = require("../models");
const Account = db.Account;

const authService = {
  async generateToken(username, password) {
    const user = await Account.findOne({ where: { username } });

    if (!user) {
      throw createHttpError(400, "User not found");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw createHttpError(400, "Wrong password");
    }

    const token = jwt.sign(
      {
        email: user.email,
        username: user.username,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    return token;
  },

  async register(email, username, password, address, name) {
    const account = await Account.findOne({
      where: {
        [Op.or]: [{ email }, { username }],
      },
    });

    if (account) {
      throw createHttpError(400, "User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await Account.create({
      email,
      username,
      password: hashedPassword,
      type: ACCOUNT_TYPE.CUSTOMER,
      address,
      name,
      createdAt: new Date().getTime(),
    });
  },
};

module.exports = authService;

require("dotenv").config();
const { expect } = require("chai");

const authService = require("../../services/auth.service");
const db = require("../../models");

const email = "test@gmail.com";
const username = "test";
const password = "123";

describe("Auth Service", function () {
  describe("Register test", function () {
    it("shoud register a user", async function () {
      const address = "123 abc";
      const name = "test user";

      await authService.register(email, username, password, address, name);

      expect(true).to.be.true;
    });
  });

  describe("Login test", function () {
    it("should return a token", async function () {
      const token = await authService.generateToken(username, password);

      expect(token).to.be.a("string");
    });
  });

  after(async function () {
    await db.Account.destroy({
      where: {
        username,
      },
    });
  });
});

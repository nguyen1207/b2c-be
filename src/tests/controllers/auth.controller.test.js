require("dotenv").config();
const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");

const { expect } = chai;
chai.use(sinonChai);

const authController = require("../../controllers/auth.controller");
const db = require("../../models");

const email = "test@gmail.com";
const username = "test";
const password = "123";

describe("Auth controller", function () {
  describe("Register test", function () {
    it("shoud register a user", async function () {
      const address = "123 abc";
      const name = "test user";

      const req = {
        body: {
          email,
          username,
          password,
          address,
          name,
        },
      };

      const res = {
        json: sinon.spy(),
        status: sinon.stub().returnsThis(),
      };

      await authController.register(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith({ message: "Registered successfully" });
    });
  });

  describe("Login test", function () {
    it("should return a token", async function () {
      const req = {
        body: {
          username,
          password,
        },
      };

      const res = {
        json: sinon.spy(),
        status: sinon.stub().returnsThis(),
      };
      await authController.login(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith({ token: sinon.match.string });
    });
  });

  after(async function () {
    await db.account.destroy({
      where: {
        username,
      },
    });
  });
});

const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");

const { expect } = chai;
chai.use(sinonChai);

const orderController = require("../../controllers/order.controller");

describe("Order controller", function () {
  describe("Get orders", function () {
    it("shoud get orders of a user", async function () {
      const req = {
        params: {
          username: "ftx",
        },
        query: {
          page: 1,
          limit: 10,
          sortBy: "createdAt",
        },
      };

      const res = {
        json: sinon.spy(),
        status: sinon.stub().returnsThis(),
      };

      await orderController.getOrderByUsername(req, res);

      expect(res.status).to.have.been.calledWith(200);
    });
  });

  describe("Create order", function () {
    it("should create an order", async function () {
      const req = {
        body: {
          paymentType: "Cash",
          email: "ftx@gmail.com",
          address: "123 abc",
          orderRows: [
            {
              productId: "74452325-85d6-42b0-9fa1-aa3c657f1afa",
              quantity: 2,
            },
            {
              productId: "50054ab3-255d-4385-a0ad-24ed78645ffe",
              quantity: 2,
            },
          ],
        },
      };

      const res = {
        json: sinon.spy(),
        status: sinon.stub().returnsThis(),
      };

      await orderController.createOrder(req, res);

      expect(res.status).to.have.been.calledWith(200);
    });
  });
});

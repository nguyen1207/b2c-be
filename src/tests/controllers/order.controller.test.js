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
              productId: "36d4e3b4-1bf4-46c7-8062-5c4fe52c8604",
              quantity: 2,
            },
            {
              productId: "5a7bf2bd-4c9c-46d1-9498-e3334a1cb542",
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

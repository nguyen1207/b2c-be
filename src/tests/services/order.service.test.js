const { expect } = require("chai");

const orderService = require("../../services/order.service");

describe("Order service", function () {
  describe("Create order", function () {
    it("should create an order", async function () {
      const order = await orderService.createOrder({
        paymentType: "Cash",
        email: "ftx@gmail.com",
        address: "123 bdf",
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
      });

      expect(order).to.be.an("object");
    });
  });

  describe("Get orders", function () {
    it("should return list of orders", async function () {
      const username = "ftx";
      const orders = await orderService.getOrdersByUsername(username);
      expect(orders.docs).to.be.an("array");
    });
  });
});

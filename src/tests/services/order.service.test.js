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
            productId: "5a7bf2bd-4c9c-46d1-9498-e3334a1cb542",
            quantity: 2,
          },
          {
            productId: "91a928e7-9cee-457e-886c-60cb9a35daa4",
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

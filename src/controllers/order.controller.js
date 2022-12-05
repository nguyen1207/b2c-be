const status = require("http-status");

const orderService = require("../services/order.service");

const orderController = {
  async getOrderByUsername(req, res) {
    const orders = await orderService.getOrdersByUsername(req.params.username);

    res.status(status.OK).json(orders);
  },

  async getOrderDetails(req, res) {
    const orderDetails = await orderService.getOrderDetails(req.params.id);

    res.status(status.OK).json(orderDetails);
  },

  async createOrder(req, res) {
    const order = await orderService.createOrder(req.body);

    res.status(status.OK).json(order);
  },
};

module.exports = orderController;

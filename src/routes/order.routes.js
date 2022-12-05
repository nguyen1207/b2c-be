const express = require("express");
const orderRouter = express.Router();

const catchAsync = require("../utils/catchAsync");
const orderController = require("../controllers/order.controller");
const authenticate = require("../middlewares/authenticate");

orderRouter.get("/:username", authenticate, catchAsync(orderController.getOrderByUsername));
orderRouter.get("/details/:id", authenticate, catchAsync(orderController.getOrderDetails));
orderRouter.post("/", authenticate, catchAsync(orderController.createOrder));

module.exports = orderRouter;

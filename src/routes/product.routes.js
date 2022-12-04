const express = require("express");
const productRouter = express.Router();
const productController = require("../controllers/product.controller");

const catchAsync = require("../utils/catchAsync");

productRouter.get("/", catchAsync(productController.getProducts));
productRouter.get("/:id", catchAsync(productController.getProductById));

module.exports = productRouter;

const express = require("express");
const productRouter = express.Router();
const productController = require("../controllers/product.controller");

productRouter.get("/", productController.getProducts);
productRouter.get("/:id", productController.getProductById);

module.exports = productRouter;

const status = require("http-status");
const productService = require("../services/product.service");

const productController = {
  async getProducts(req, res) {
    const products = await productService.getProducts();

    res.status(status.OK).json(products);
  },

  async getProductById(req, res) {
    const product = await productService.getProductById(req.params.id);

    res.status(status.OK).json(product);
  },
};

module.exports = productController;

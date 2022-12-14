const status = require("http-status");
const productService = require("../services/product.service");

const productController = {
  async getProducts(req, res) {
    const { page, limit, sortBy } = req.query;

    const products = await productService.getProducts(page, limit, sortBy);

    res.status(status.OK).json(products);
  },

  async getProductsByIds(req, res) {
    const productIds = JSON.parse(req.query.productIds);

    console.log(productIds);

    const products = await productService.getProductsByIds(productIds);

    res.status(status.OK).json(products);
  },

  async getProductById(req, res) {
    const product = await productService.getProductById(req.params.id);

    res.status(status.OK).json(product);
  },
};

module.exports = productController;

const db = require("../models");
const Product = db.product;

const productService = {
  async getProducts() {
    const products = await Product.findAll();

    return products;
  },

  async getProductById(id) {
    const product = await Product.findByPk(id);

    return product;
  },
};

module.exports = productService;

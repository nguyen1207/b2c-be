const db = require("../models");
const Product = db.Product;

const productService = {
  async getProducts(page, limit, sortBy = "productId") {
    const orderBy = sortBy[0] === "-" ? [sortBy.slice(1), "DESC"] : [sortBy, "ASC"];
    const options = {
      page: page || 1,
      paginate: parseInt(limit, 10) || 2,
      order: [orderBy],
    };
    const products = await Product.paginate(options);

    return products;
  },

  async getProductById(id) {
    const product = await Product.findByPk(id);

    return product;
  },
};

module.exports = productService;

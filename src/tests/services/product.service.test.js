const { expect } = require("chai");

const productService = require("../../services/product.service");

describe("Product service", function () {
  describe("View product test", function () {
    it("should return list of products", async function () {
      const products = await productService.getProducts();
      expect(products.docs).to.be.an("array");
    });
  });
});

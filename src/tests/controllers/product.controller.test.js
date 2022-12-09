const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");

const { expect } = chai;
chai.use(sinonChai);

const productController = require("../../controllers/product.controller");

describe("Product controller", function () {
  describe("Get products", function () {
    it("shoud return list of products", async function () {
      const req = {
        query: {
          page: 1,
          limit: 10,
        },
      };

      const res = {
        json: sinon.spy(),
        status: sinon.stub().returnsThis(),
      };

      await productController.getProducts(req, res);

      expect(res.status).to.have.been.calledWith(200);
    });
  });

  describe("Get product by ID", function () {
    it("should return a product", async function () {
      const req = {
        params: {
          id: "74452325-85d6-42b0-9fa1-aa3c657f1afa",
        },
      };

      const res = {
        json: sinon.spy(),
        status: sinon.stub().returnsThis(),
      };

      await productController.getProductById(req, res);

      expect(res.status).to.have.been.calledWith(200);
    });
  });
});

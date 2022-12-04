const createHttpError = require("http-errors");

const productRouter = require("./product.routes");

const route = (app) => {
  app.use("/api/products", productRouter);

  // 404 Error
  app.use((req, res, next) => {
    res.json({
      statusCode: 404,
      message: "Resources not found",
    });
  });

  // 500 Error
  app.use((err, req, res, next) => {
    logger.error(err.message, { label: "500 Error" });

    if (createHttpError.isHttpError(err)) {
      res.status(err.statusCode).json({
        statusCode: err.statusCode,
        message: err.message,
      });
    } else {
      res.status(500).json({
        statusCode: 500,
        message: "Internal Server Error",
      });
    }
  });
};

module.exports = route;

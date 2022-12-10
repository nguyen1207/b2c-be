const createHttpError = require("http-errors");
const uuid = require("uuid");

const { PAYMENT_TYPE, PAYMENT_STATUS, ORDER_STATUS } = require("../utils/constants");
const db = require("../models");
const Order = db.Order;
const Account = db.Account;
const Product = db.Product;
const OrderRow = db.OrderRow;

const orderService = {
  async getOrdersByUsername(username, page, limit, sortBy = "-createdAt") {
    const orderBy = sortBy[0] === "-" ? [sortBy.slice(1), "DESC"] : [sortBy, "ASC"];

    const account = await Account.findOne({ where: { username } });

    if (!account) {
      throw createHttpError(400, "User not found");
    }

    const options = {
      page: page || 1,
      paginate: parseInt(limit, 10) || 5,
      order: [orderBy],
      where: { email: account.email },
    };

    const orders = await Order.paginate(options);

    return orders;
  },

  async getOrderDetails(orderId) {
    const order = await Order.findByPk(orderId, {
      include: [
        {
          model: OrderRow,
          as: "order_rows",
          include: {
            model: Product,
            as: "product",
          },
        },
        {
          model: Account,
          as: "account",
        },
      ],
    });

    if (!order) {
      throw createHttpError(400, "Order not found");
    }

    return order;
  },

  async createOrder(body) {
    const transaction = await db.sequelize.transaction();
    try {
      const account = await Account.findOne({ where: { email: body.email } });

      if (!account) {
        throw createHttpError(400, "User not found");
      }

      // validate products
      const productIds = body.orderRows.map((orderRow) => orderRow.productId);
      const products = await Product.findAll({
        where: { productId: productIds },
      });

      if (products.length !== productIds.length) {
        throw createHttpError(400, "Product not found");
      }

      // update products quantity
      products.forEach((product) => {
        const orderProduct = body.orderRows.find((orderRow) => orderRow.productId === product.productId);

        if (product.quantity < orderProduct.quantity) {
          throw createHttpError(400, `There is not enough stock for '${product.name}'`);
        }

        product.quantity -= orderProduct.quantity;
      });

      await Promise.all(products.map((product) => product.save({ transaction })));

      const totalPrice = products.reduce((total, product) => {
        const orderRow = body.orderRows.find((orderRow) => orderRow.productId === product.productId);

        return total + product.price * orderRow.quantity;
      }, 0);

      let paymentType;
      let paymentStatus;

      switch (body.paymentType) {
        case "Cash":
          paymentType = PAYMENT_TYPE.CASH;
          paymentStatus = PAYMENT_STATUS.PENDING;
          break;
        case "MoMo":
          paymentType = PAYMENT_TYPE.MOMO;
          paymentStatus = PAYMENT_STATUS.PAID;
          break;
        case "Bank":
          paymentType = PAYMENT_TYPE.BANK;
          paymentStatus = PAYMENT_STATUS.PAID;
          break;
        default:
          throw createHttpError(400, "Payment type is invalid");
      }

      // create order
      const order = await Order.create(
        {
          orderId: uuid.v4(),
          paymentType,
          paymentStatus,
          orderStatus: ORDER_STATUS.PROCESSING,
          totalPrice,
          createdAt: new Date().getTime(),
          email: account.email,
          address: body.address,
          shippingCost: 50000,
        },
        { transaction }
      );

      // create order rows
      const orderRows = body.orderRows.map((orderRow) => ({
        orderId: order.orderId,
        productId: orderRow.productId,
        quantity: orderRow.quantity,
        createdAt: new Date().getTime(),
      }));

      await OrderRow.bulkCreate(orderRows, { transaction });

      await transaction.commit();

      return order;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },
};

module.exports = orderService;

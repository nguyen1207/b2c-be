const createHttpError = require("http-errors");
const uuid = require("uuid");

const db = require("../models");
const Order = db.orders;
const Account = db.account;
const Product = db.product;
const OrderRow = db.order_row;

const orderService = {
  async getOrdersByUsername(username) {
    const account = await Account.findOne({ where: { username } });

    if (!account) {
      throw createHttpError(400, "User not found");
    }

    const orders = await Order.findAll({ where: { email: account.email } });

    return orders;
  },

  async getOrderDetails(orderId) {
    const order = await Order.findByPk(orderId, {
      include: [
        {
          model: OrderRow,
          as: "orderRows",
          include: {
            model: db.product,
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
      const products = await db.product.findAll({
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

      // create order
      const order = await Order.create(
        {
          orderId: uuid.v4(),
          paymentType: body.paymentType,
          paymentStatus: "Pending",
          orderStatus: "Processing",
          totalPrice,
          createdAt: new Date(),
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
      }));

      await OrderRow.bulkCreate(orderRows, { transaction });

      await transaction.commit();

      return { message: "Order created successfully" };
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },
};

module.exports = orderService;

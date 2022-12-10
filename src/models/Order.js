const { Sequelize } = require("sequelize");
const sequelizePaginate = require("sequelize-paginate");
const { PAYMENT_TYPE, PAYMENT_STATUS, ORDER_STATUS } = require("../utils/constants");

Sequelize.DATE.prototype._TEXTify = function _TEXTify(date, options) {
  date = this._applyTimezone(date, options);
  return date.format("YYYY-MM-DD HH:mm:ss.SSS");
};

module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define(
    "Order",
    {
      orderId: {
        type: DataTypes.TEXT,
        primaryKey: true,
        allowNull: false,
      },
      paymentType: {
        type: DataTypes.INTEGER,
        allowNull: false,
        values: [PAYMENT_TYPE.BANK, PAYMENT_TYPE.CASH, PAYMENT_TYPE.MOMO],
      },
      paymentStatus: {
        type: DataTypes.INTEGER,
        allowNull: false,
        values: [PAYMENT_STATUS.PENDING, PAYMENT_STATUS.PAID],
      },
      orderStatus: {
        type: DataTypes.INTEGER,
        allowNull: false,
        values: [ORDER_STATUS.PROCESSING, ORDER_STATUS.DELIVERING, ORDER_STATUS.DELIVERED],
      },
      totalPrice: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.BIGINT,
      },
      email: {
        type: DataTypes.TEXT,
        references: {
          model: "Account",
          key: "email",
        },
        allowNull: false,
      },
      address: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      shippingCost: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
    },
    {
      underscored: true,
      timestamps: false,
      tableName: "Order",
    }
  );

  sequelizePaginate.paginate(Order);

  return Order;
};

const { Sequelize } = require("sequelize");
const sequelizePaginate = require("sequelize-paginate");

Sequelize.DATE.prototype._stringify = function _stringify(date, options) {
  date = this._applyTimezone(date, options);
  return date.format("YYYY-MM-DD HH:mm:ss.SSS");
};

module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define(
    "Order",
    {
      orderId: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
      paymentType: {
        type: DataTypes.STRING,
        allowNull: false,
        values: ["Cash", "Bank", "MoMo"],
      },
      paymentStatus: {
        type: DataTypes.STRING,
        allowNull: false,
        values: ["Pending", "Paid"],
      },
      orderStatus: {
        type: DataTypes.STRING,
        allowNull: false,
        values: ["Processing", "Delivering", "Delivered"],
      },
      totalPrice: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      email: {
        type: DataTypes.STRING,
        references: {
          model: "account",
          key: "email",
        },
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      shippingCost: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
    },
    {
      tableName: "orders",
      timestamps: false,
    }
  );

  sequelizePaginate.paginate(Order);

  return Order;
};

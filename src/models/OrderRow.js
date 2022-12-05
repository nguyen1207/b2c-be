module.exports = (sequelize, DataTypes) => {
  const OrderRow = sequelize.define(
    "OrderRow",
    {
      orderId: {
        type: DataTypes.STRING,
        references: {
          model: "orders",
          key: "orderId",
        },
        primaryKey: true,
      },
      productId: {
        type: DataTypes.STRING,
        references: {
          model: "product",
          key: "productId",
        },
        primaryKey: true,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "order_row",
      timestamps: false,
    }
  );

  return OrderRow;
};

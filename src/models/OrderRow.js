module.exports = (sequelize, DataTypes) => {
  const OrderRow = sequelize.define(
    "OrderRow",
    {
      orderId: {
        type: DataTypes.TEXT,
        references: {
          model: "Order",
          key: "orderId",
        },
        primaryKey: true,
      },
      productId: {
        type: DataTypes.TEXT,
        references: {
          model: "Product",
          key: "productId",
        },
        primaryKey: true,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.BIGINT,
      },
    },
    {
      underscored: true,
      timestamps: false,
      tableName: "OrderRow",
    }
  );

  return OrderRow;
};

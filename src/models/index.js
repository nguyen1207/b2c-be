const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize("supplement_facts", "nguyen", "123", {
  host: "localhost",
  dialect: "mssql",
  dialectOptions: {
    options: {
      encrypt: false,
      trustServerCertificate: true,
    },
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

const Account = require("./Account")(sequelize, DataTypes);
const Order = require("./Order")(sequelize, DataTypes);
const OrderRow = require("./OrderRow")(sequelize, DataTypes);
const Product = require("./Product")(sequelize, DataTypes);

db.account = Account;
db.orders = Order;
db.order_row = OrderRow;
db.product = Product;

console.log(Account);

db.sequelize.sync({ force: false }).then(() => {
  console.log("Synced");
});

db.account.hasMany(db.orders, { foreignKey: "email", as: "orders" });
db.orders.belongsTo(db.account, { foreignKey: "email", as: "account" });

db.orders.hasMany(db.order_row, { foreignKey: "orderId", as: "orderRows" });
db.order_row.belongsTo(db.orders, { foreignKey: "orderId", as: "order" });

db.order_row.belongsTo(db.product, { foreignKey: "productId", as: "product" });
db.product.hasMany(db.order_row, { foreignKey: "productId", as: "orderRows" });

module.exports = db;

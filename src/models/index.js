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

db.Account = Account;
db.Order = Order;
db.OrderRow = OrderRow;
db.Product = Product;

console.log(Account);

db.sequelize.sync({ force: false }).then(() => {
  console.log("Synced");
});

db.Account.hasMany(db.Order, { foreignKey: "email", as: "orders" });
db.Order.belongsTo(db.Account, { foreignKey: "email", as: "account" });

db.Order.hasMany(db.OrderRow, { foreignKey: "order_id", as: "order_rows" });
db.OrderRow.belongsTo(db.Order, { foreignKey: "order_id", as: "order" });

db.OrderRow.belongsTo(db.Product, { foreignKey: "product_id", as: "product" });
db.Product.hasMany(db.OrderRow, { foreignKey: "product_id", as: "order_rows" });

module.exports = db;

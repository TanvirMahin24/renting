const Sequelize = require("sequelize");
const sequelize = require("../Utils/database");

const Subscriber = sequelize.define("subscriber", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  phone: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Subscriber;

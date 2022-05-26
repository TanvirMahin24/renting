const Sequelize = require("sequelize");
const sequelize = require("../utils/database");

const Subscriber = sequelize.define("subscriber", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Subscriber;

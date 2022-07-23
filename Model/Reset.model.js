const Sequelize = require("sequelize");
const sequelize = require("../Utils/database");

const Reset = sequelize.define("reset", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  token: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Reset;

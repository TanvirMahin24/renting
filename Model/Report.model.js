const Sequelize = require("sequelize");
const sequelize = require("../Utils/database");

const Report = sequelize.define("report", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  message: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Report;

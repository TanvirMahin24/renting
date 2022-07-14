const Sequelize = require("sequelize");
const sequelize = require("../Utils/database");

const Request = sequelize.define("request", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  occupation: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  job_title: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  phone: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  document: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  status: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: "pending",
  },
});

module.exports = Request;

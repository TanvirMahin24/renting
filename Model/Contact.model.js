const Sequelize = require("sequelize");
const sequelize = require("../Utils/database");

const Contact = sequelize.define("contact", {
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
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  message: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  reply: {
    type: Sequelize.STRING,
    allowNull: true,
  },
});

module.exports = Contact;

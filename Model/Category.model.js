const Sequelize = require("sequelize");
const sequelize = require("../Utils/database");

const Category = sequelize.define("category", {
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
});

module.exports = Category;

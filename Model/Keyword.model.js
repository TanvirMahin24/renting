const Sequelize = require("sequelize");
const sequelize = require("../Utils/database");

const Keyword = sequelize.define("keyword", {
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

module.exports = Keyword;

const Sequelize = require("sequelize");
const sequelize = require("../utils/database");

const Requirement = sequelize.define("requirement", {
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

module.exports = Requirement;

const Sequelize = require("sequelize");
const sequelize = require("../Utils/database");

const Image = sequelize.define("image", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  image: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Image;

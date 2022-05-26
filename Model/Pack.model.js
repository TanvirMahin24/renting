const Sequelize = require("sequelize");
const sequelize = require("../utils/database");

const Pack = sequelize.define("pack", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  image: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  slug: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  price: {
    type: Sequelize.DOUBLE,
    allowNull: false,
  },
  originalPrice: {
    type: Sequelize.DOUBLE,
    allowNull: false,
  },
  sell: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  target: {
    type: Sequelize.INTEGER,
    allowNull: true,
    defaultValue: null,
  },
  targetPrice: {
    type: Sequelize.INTEGER,
    allowNull: true,
    defaultValue: null,
  },
});

module.exports = Pack;

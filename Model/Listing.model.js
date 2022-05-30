const Sequelize = require("sequelize");
const sequelize = require("../Utils/database");

const Listing = sequelize.define("listing", {
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
  description: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  slug: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  size: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  status: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  sublet: {
    type: Sequelize.BOOLEAN,
    allowNull: true,
  },

  // ROOMS
  bedrooms: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  bathrooms: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  dining: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  kitchen: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  drawingroom: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },

  // Address
  full_address: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  district: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  house_no: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  floor_no: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  flat_no: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  lat: {
    type: Sequelize.DOUBLE,
    allowNull: true,
  },
  long: {
    type: Sequelize.DOUBLE,
    allowNull: true,
  },
});

module.exports = Listing;

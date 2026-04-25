const Sequelize = require("sequelize");
const sequelize = require("../util/db");

const User = sequelize.define(
  "user",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    firstName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    lastName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    phone: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    whatsapp: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    birthday: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    gender: {
      type: Sequelize.ENUM("male", "female"),
      allowNull: false,
    },
    education: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    edu_status: {
      type: Sequelize.ENUM("graduate", "undergrad"),
      allowNull: false,
    },
    address: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    updatedAt: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW,
    },
  },
  {
    timestamps: true,
    tableName: "users",
  },
);

module.exports = User;

const dotenv = require("dotenv").config();
const app = require("../app");
const sequelize = require("../util/db");

let initPromise;

const initDatabase = async () => {
  if (!initPromise) {
    initPromise = sequelize.sync();
  }
  return initPromise;
};

module.exports = async (req, res) => {
  try {
    await initDatabase();
    return app(req, res);
  } catch (error) {
    console.error("Database connection failed", error);
    return res.status(500).json({
      success: false,
      message: "Database connection failed",
    });
  }
};

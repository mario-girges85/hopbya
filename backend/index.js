const dotenv = require("dotenv").config();
const app = require("./app");
const sequelize = require("./util/db");
const port = process.env.PORT;

const startServer = async () => {
  try {
    await sequelize.sync();
    console.log("Database connected successfully");

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error("Database connection failed", error);
    process.exit(1);
  }
};

startServer();

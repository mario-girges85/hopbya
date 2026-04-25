const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const Sequelize = require("sequelize");

const sequelize = require("./util/db");

const userRoutes = require("./routes/user");

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Hobpya API is running",
  });
});

app.use("/api/user", userRoutes);

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

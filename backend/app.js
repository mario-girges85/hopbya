const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

const userRoutes = require("./routes/user");

const app = express();

app.use(
  cors({
    origin: true,
    credentials: true,
  }),
);
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/user", userRoutes);

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Hobpya API is running",
  });
});

module.exports = app;

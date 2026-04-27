const express = require("express");
const router = express.Router();
const { addUser, loginUser, logoutUser } = require("../controllers/users");
router.post("/signup", addUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/test", (req, res) => {
  res.send("User Route");
});

module.exports = router;

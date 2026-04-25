const express = require("express");
const router = express.Router();
const { addUser, loginUser } = require("../controllers/users");
router.post("/signup", addUser);
router.post("/login", loginUser);

router.get("/test", (req, res) => {
  res.send("User Route");
});

module.exports = router;

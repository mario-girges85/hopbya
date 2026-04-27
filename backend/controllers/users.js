const bcrypt = require("bcrypt");
const User = require("../models/user");
const sequelize = require("../util/db");
const { Op } = require("sequelize");
const jwt = require("jsonwebtoken");
const normalizePhone = require("../util/normalizePhone");
const dotenv = require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET;
module.exports.addUser = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      phone,
      whatsapp,
      email,
      password,
      birthday,
      gender,
      education,
      address,
      edu_status,
    } = req.body;

    if (
      !firstName ||
      !lastName ||
      !phone ||
      !whatsapp ||
      !email ||
      !password ||
      !birthday ||
      !gender ||
      !education ||
      !address ||
      !edu_status
    ) {
      return res
        .status(400)
        .send({ message: "All fields are required", success: false });
    }
    // console.log(req.body);

    // Validate email format if provided
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).send({
        message: "Invalid email format",
        success: false,
      });
    }
    //check if email already exists
    const alreadyexistsEmail = await User.findOne({ where: { email } });
    if (alreadyexistsEmail) {
      return res.status(400).send({
        message: "Email already exists",
        success: false,
      });
    }
    //check if phone already exists
    const alreadyexistsPhone = await User.findOne({ where: { phone } });
    if (alreadyexistsPhone) {
      return res.status(400).send({
        message: "Phone already exists",
        success: false,
      });
    }

    //hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      firstName,
      lastName,
      phone,
      whatsapp,
      email,
      password: hashedPassword,
      birthday,
      gender,
      education,
      edu_status,
      address,
    });
    return res.status(201).send({
      message: "User added successfully",
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.loginUser = async (req, res) => {
  try {
    // console.log(req.body);
    // res.send(req.body);
    const { emailOrPhone, password } = req.body;
    if (!emailOrPhone || !password) {
      return res
        .status(400)
        .send({ message: "All fields are required", success: false });
    }
    const normalizedInput = emailOrPhone.trim();
    const normalizedPhone = normalizePhone(normalizedInput);

    // This code attempts to find a user record in the database where either the email (lowercased) matches the user's input,
    // or, if a valid phone number could be normalized from input, where the phone matches the normalized phone.
    const user = await User.findOne({
      where: {
        [Op.or]: [
          { email: normalizedInput.toLowerCase() },
          ...(normalizedPhone ? [{ phone: normalizedPhone }] : []),
        ],
      },
    });
    if (!user) {
      return res
        .status(400)
        .send({ message: "User not found", success: false });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res
        .status(400)
        .send({ message: "Invalid password", success: false });
    }
    const userData = user.toJSON();
    delete userData.password;

    const token = jwt.sign({ userData }, JWT_SECRET);

    return res.status(200).send({
      message: "Login successful",
      success: true,
      user: userData,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Internal server error" });
  }
};

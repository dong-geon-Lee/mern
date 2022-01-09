const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/", async (req, res) => {
  try {
    const { email, password, passwordVerify } = req.body;

    // validation
    if (!email || !password || !passwordVerify) {
      return res.json({
        errorMessage: "Please enter all required fields",
      });
    }

    if (password.length < 4) {
      return res.json({
        errorMessage: "Please enter a password of at least 4",
      });
    }

    if (password !== passwordVerify) {
      return res.json({
        errorMessage: "Please enter the same twice for verification.",
      });
    }

    // make sure no account exists for this email
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.json({
        errorMessage: "An account with this email already exists.",
      });
    }

    //  hash the password
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    // save the user in the database
    const newUser = new User({
      email,
      passwordHash,
    });

    const savedUser = await newUser.save();

    // create JWT token
    const token = jwt.sign(
      {
        id: savedUser._id,
      },
      process.env.JWT_SECRET
    );

    res.cookie("token", token, { httpOnly: true }).send();
  } catch (err) {
    res.status(500).send();
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // validation
    if (!email || !password) {
      return res.json({
        errorMessage: "Please enter all required fields",
      });
    }

    // get user account
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.json({
        errorMessage: "Wrong email or password",
      });
    }

    const correctPassword = await bcrypt.compare(
      password,
      existingUser.passwordHash
    );

    if (!correctPassword) {
      return res.status(401).json({ errorMessage: "Wrong email or password" });
    }

    // create JWT token
    const token = jwt.sign(
      {
        id: existingUser._id,
      },
      process.env.JWT_SECRET
    );

    res.cookie("token", token, { httpOnly: true }).send();
  } catch (err) {
    res.status(500).send();
  }
});

module.exports = router;

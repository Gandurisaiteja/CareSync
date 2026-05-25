const User = require("../models/User");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");


// REGISTER USER
const registerUser = async (
  req,
  res
) => {

  try {

    const {
      name,
      email,
      password,
      role,
    } = req.body;

    // CHECK EMPTY FIELDS
    if (
      !name ||
      !email ||
      !password ||
      !role
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // CHECK USER EXISTS
    const existingUser =
      await User.findOne({
        where: { email },
      });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message:
          "User already exists",
      });
    }

    // HASH PASSWORD
    const hashedPassword =
      await bcrypt.hash(
        password,
        10
      );

    // CREATE USER
    const user =
      await User.create({
        name,
        email,
        password: hashedPassword,
        role,
      });

    res.status(201).json({
      success: true,
      message:
        "User registered successfully",

      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};



// LOGIN USER
const loginUser = async (
  req,
  res
) => {

  try {

    const {
      email,
      password,
    } = req.body;

    // CHECK FIELDS
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message:
          "Email and password required",
      });
    }

    // FIND USER
    const user =
      await User.findOne({
        where: { email },
      });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // CHECK PASSWORD
    const isMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid credentials",
      });
    }

    // GENERATE TOKEN
    const token = jwt.sign(
      {
        id: user.id,
        role: user.role,
      },

      process.env.JWT_SECRET,

      {
        expiresIn: "7d",
      }
    );

    // RESPONSE
    res.status(200).json({
      success: true,
      message: "Login successful",
      token,

      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};


module.exports = {
  registerUser,
  loginUser,
};
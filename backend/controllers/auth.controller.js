import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/genToken.js";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    generateToken(user, res);

    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
        name: user.name,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    console.error("Login error:", error);
  }
};

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const username = email.split("@")[0]; // Simple username generation from email
    if (!username) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    let count = 1;
    while (await User.findOne({ username })) {
      username = `${username}${count}`;
      count++;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      username,
      name,
      email,
      password: hashedPassword,
    });

    generateToken(newUser, res);

    res.status(201).json({
      message: "Registration successful",
      user: {
        id: newUser._id,
        email: newUser.email,
        username: newUser.username,
        name: newUser.name,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    console.error("Registration error:", error);
  }
};

export const logout = (req, res) => {
  try {
    res.cookie("jwtToken", "");
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    console.error("Logout error:", error);
  }
};

export const getProfile = (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    console.error("Get profile error:", error);
  }
};

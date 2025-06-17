import User from "../models/User.js";
import bcrypt from "bcrypt";

// Admin: create user of any role
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log("Incoming Data:", req.body); //

    const exists = await User.findOne({ email });
    if (exists)
      return res.status(400).json({ message: "Email already exists" });

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashed,
      role: "user",
    });

    res.status(201).json({ message: "User created", user });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create user", error: error.message });
  }
};

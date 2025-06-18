import User from "../models/User.js";
import bcrypt from "bcrypt";

// Admin: create user of any role
export const createUser = async (req, res) => {
  try {
    const { name, email, address, password, role } = req.body;

    const exists = await User.findOne({ email });
    if (exists)
      return res.status(400).json({ message: "Email already exists" });

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      address,
      password: hashed,
      role,
    });

    res.status(201).json({ message: "User created", user });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create user", error: error.message });
  }
};

// Admin: get all users with filtering
export const getUsers = async (req, res) => {
  try {
    const { name, email, address, role } = req.query;
    const query = {};

    if (name) query.name = new RegExp(name, "i");
    if (email) query.email = new RegExp(email, "i");
    if (address) query.address = new RegExp(address, "i");
    if (role) query.role = role;

    const users = await User.find(query).select("-password");
    res.status(200).json(users);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch users", error: error.message });
  }
};

import jwt from 'jsonwebtoken';
import Admin from '../models/adminModel.js';


export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).json({ success: false, message: "Admin not found" });
    }

    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    // Generate token
    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    res.status(200).json({ success: true, token });

  } catch (error) {
    console.error("Admin Login Error:", error.message);
    res.status(500).json({ success: false, message: "Login failed" });
  }
};

// 🆕 SIGNUP ADMIN
export const signupAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ success: false, message: "Admin already exists" });
    }

    const newAdmin = new Admin({ email, password });
    await newAdmin.save();

    res.status(201).json({ success: true, message: "Admin created successfully" });
  } catch (error) {
    console.error("Admin Signup Error:", error.message);
    res.status(500).json({ success: false, message: "Signup failed" });
  }
};

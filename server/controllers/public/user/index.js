import express from "express";
import bcrypt from "bcryptjs";
import User from "../../../models/User.js";
import sendEmail from "../../../utils/sendEmail.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { firstName, lastName, email, age, mobile, gender } = req.body;
    //check email
    const existingEmail = await User.findOne({ email });
    // check mobile
    const existingMobile = await User.findOne({ mobile });

    if (existingEmail || existingMobile) {
      return res.status(400).json({ msg: "Email or Mobile already exists" });
    }

    // userId gneerate unique

    const userId = `${firstName.toUpperCase()}-${Date.now()}`;

    // randompassword
    const randomPassword = Math.random().toString(36).slice(-8);

    // enxrypt  password
    const hashedPassword = await bcrypt.hash(randomPassword, 10);

    const user = await User.create({
      firstName,
      lastName,
      email,
      age,
      mobile,
      gender,
      password: hashedPassword,
      userId,
    });

    await sendEmail(
      email,
      "Registration Successful",
      `Hello ${firstName},

Your User ID is: ${userId}
Your Password is: ${randomPassword}`,
    );

    return res.status(201).json({
      msg: "User Created Successfully",
      userId: user.userId,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server error" });
  }
});

// GET pagination

router.get("/users", async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;

    const skip = (page - 1) * limit;

    const users = await User.find().select("-password").skip(skip).limit(limit);
    // Count total users
    const totalUsers = await User.countDocuments();

    // Calculate total pages
    const totalPages = Math.ceil(totalUsers / limit);

    res.status(200).json({ users, currentPage:page, totalPages, totalUsers });
  } catch (error) {
    console.log(error)
    res.status(500).json({ msg: "server error" });
  }
});

// POST Login

router.post("/login", async (req, res) => {
  try {
    //get login values from postman
    const { userId, password } = req.body;

    // find user with userId
    const user = await User.findOne({ userId });

    if (!user)
      return res.status(400).json({ msg: "Invalid UserId or Password" });

    // compare entered pass with hash pass
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch)
      return res.status(400).json({ msg: "Invalid UserId or Password" });
    res.status(200).json({ msg: "Login Success", userId: user.userId });
  } catch (error) {
    console.log(error)
    res.status(500).json({ msg: "Server error" });
  }
});

export default router;

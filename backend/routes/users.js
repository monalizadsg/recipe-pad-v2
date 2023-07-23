import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { UserModel } from "../model/Users.js";

const router = express.Router();

router.post("/sign-up", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  const user = await UserModel.findOne({ email });

  if (user) {
    return res.json({ message: "User already exists!" });
  }

  // hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // add new user to db
  const newUser = new UserModel({
    firstName,
    lastName,
    email,
    password: hashedPassword,
  });
  await newUser.save(); // this will create the user

  res.json({ message: "User registered successfully!" });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await UserModel.findOne({ email });

  if (!user) {
    return res.json({ message: "User doesn't exist!" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.json({ message: "Username or password is incorrect!" });
  }

  const token = jwt.sign({ id: user.id }, "secret");
  res.json({ token, userID: user._id });
});

export { router as userRouter };

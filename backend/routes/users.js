import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { UserModel } from "../model/Users.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  console.log({ firstName, lastName, email, password });

  try {
    let user = await UserModel.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists!" });
      // return res.status(400).send("user already registered.");
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // add new user to db
    const newUser = new UserModel({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
    await newUser.save(); // this will create the user

    res.send(newUser);
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
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

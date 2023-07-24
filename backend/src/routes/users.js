import express from "express";
import bcrypt from "bcrypt";
import { UserModel } from "../model/Users.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    // TODO: validate form data

    let user = await UserModel.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists!" });
    }

    // encrypt password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // add new user to db
    const newUser = new UserModel({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
    await newUser.save();

    res.status(201).send({ email: newUser.email });
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
});

router.get("/users/me", async (req, res) => {
  const email = req.user.email;
  const user = await UserModel.findOne({ email });
  res.send({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
  });
});

export { router as userRouter };

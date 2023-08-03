import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { UserModel } from "../model/Users.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { email, password } = req.body;

  const user = await UserModel.findOne({ email });

  if (!user) {
    return res.status(400).json({ message: "User doesn't exist!" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res
      .status(400)
      .json({ message: "Username or password is incorrect!" });
  }

  const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET);
  res.json({
    token,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    id: user.id,
  });
});

export { router as authRouter };

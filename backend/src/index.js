import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import { userRouter } from "../routes/users.js";

const app = express();

// middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// router
app.use("/auth", userRouter);

// connect to db
mongoose.connect(
  "mongodb+srv://dasigm:RPad123@recipes.s6jbcpp.mongodb.net/recipes?retryWrites=true&w=majority"
);

app.listen(3001, () => console.log("SERVER STARTED"));

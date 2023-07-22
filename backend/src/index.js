import express from "express";
import cors from "cors";
import mongoose from "mongoose";

const app = express();

// middleware
app.use(express.json());
app.use(cors());

// connect to db
mongoose.connect(
  "mongodb+srv://dasigm:RPad123@recipes.s6jbcpp.mongodb.net/recipes?retryWrites=true&w=majority"
);

app.listen(3001, () => console.log("SERVER STARTED"));

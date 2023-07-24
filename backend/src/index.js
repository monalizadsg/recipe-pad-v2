import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import { appRouter } from "./routes/index.js";

const app = express();
const port = process.env.PORT || 3000;
const mongoURI = process.env.MONGO_URI;

// middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// router
app.use("/api", appRouter);

// connect to db
mongoose.connect(mongoURI);

app.listen(port, () => console.log("SERVER STARTED"));

import express from "express";
import { authRouter } from "./auth.js";
import { userRouter } from "./users.js";
import { recipeRouter } from "./recipes.js";
import auth from "../middlewares/authMiddleware.js";

const router = express.Router();

router.use("/auth", authRouter);
router.use("/users", userRouter);
router.use("/recipes", auth, recipeRouter);

export { router as appRouter };

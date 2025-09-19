import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";

export const userRouter = Router();

// user registration
userRouter.route("/register").post(registerUser);

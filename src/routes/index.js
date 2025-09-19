import { Router } from "express";
import { userRouter } from "./user.routes.js";
import { videoRouter } from "./video.routes.js";

export const router = Router();

// mount child routers
router.use("/user", userRouter);
router.use("/video", videoRouter);

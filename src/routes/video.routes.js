import { Router } from "express";

export const videoRouter = Router()

videoRouter.route('/').get(videoContooer)
import { Router } from "express";
import { verify } from "../controllers/auth.js";

const authRouter = Router();

authRouter.patch("/verify/:token", verify);
export default authRouter;

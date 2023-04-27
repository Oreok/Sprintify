import { Router } from "express";
import { getNotificationsByUser } from "../controllers/notification.js";

const notificationRouter = Router();

notificationRouter.post("/getNotificationsByUser/", getNotificationsByUser);

export default notificationRouter;

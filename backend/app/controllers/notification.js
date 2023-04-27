import tryCatch from "./utils/tryCatch.js";
import Notification from "../models/notification.js";

//get Notifications by user
export const getNotificationsByUser = tryCatch(async (req, res) => {
  const teamId = req.body?.team;
  const userId = req.body.id;

  //get data and populate team and project - grab only 50
  const notifications = await Notification.find()
    .limit(50)
    .populate("team")
    .populate("project")
    .sort({ createdAt: "desc" })
    .exec();
  
  //delete all notifications older than 4 days
  await Notification.deleteMany({ createdAt: { $lt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4) } }).exec()

  //filter notifications by team and user
  const filteredNotifications = notifications.filter((notification) => {
    if (notification.team !== null && notification.team !== undefined) {
      if (notification.team._id.toString() === teamId) {
        return notification;
      }
    }
    if (notification.project !== null && notification.project !== undefined) {
      if (notification.project.teams.includes(teamId)) {
        return notification;
      }
    }
    if (
      notification.user !== null &&
      notification.user !== undefined &&
      userId === notification.user._id.toString()
    ) {
      return notification;
    }
  });

  //slice it down to 25 Why here? because if we only grab 25 from the db, we might not get enough notifications that could be
  //relevant to the user. So we grab 50, filter them, and then slice them down to 25
  res.status(200).json({ success: true, result: filteredNotifications.slice(0, 25) });
});

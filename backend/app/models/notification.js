import mongoose from "mongoose";

const types = [
  "CREATE_SPRINT",
  "CREATE_STORY",
  "ADD_TEAMMEMBER",
  "DELETE_TEAMMEMBER",
  "DELETE_SPRINT",
  "UPDATE_STORY_STATUS",
  "SIGNUP",
];

const notificationSchema = mongoose.Schema(
  {
    notificationType: {
      type: String,
      enum: types,
      required: true,
    },
    notificationTitle: {
      type: String,
      required: true,
    },
    notificationDescription: {
      type: String,
      required: true,
    },
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      default: null,
    },
    team: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
      default: null,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  { timestamps: true }
);

const Notification = mongoose.model("Notification", notificationSchema);

export default Notification;

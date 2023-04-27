import mongoose from "mongoose";

const projectSchema = mongoose.Schema(
  {
    projectName: {
      type: String,
      required: true,
    },
    projectDescription: {
      type: String,
      required: true,
    },
    productOwner: {
      type: mongoose.Schema.Types.ObjectID,
      ref: "User",
      required: true,
    },
    teams: [
      {
        type: mongoose.Schema.Types.ObjectID,
        ref: "Team",
      },
    ],
    sprints: [
      {
        type: mongoose.Schema.Types.ObjectID,
        ref: "Sprint",
      },
    ],
  },
  { timestamps: true }
);

const Project = mongoose.model("Project", projectSchema);

export default Project;

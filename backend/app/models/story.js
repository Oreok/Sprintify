import mongoose from "mongoose";

const storySchema = mongoose.Schema(
  {
    storyTitle: {
      type: String,
      required: true,
    },
    storyDescription: {
      type: String,
      required: true,
    },
    storyPriority: {
      type: "String",
      default: "Niedrig",
      enum: ["Niedrig", "Mittel", "Hoch"],
      required: true,
    },
    storypoints: {
      type: Number,
      required: true,
    },
    storyStatus: {
      type: "String",
      default: "TODO",
      enum: ["TODO", "IN_PROGRESS", "DONE"],
    },
    assignedUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    assignedTeam: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
      default: null,
    },
    assignedSprint: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Sprint",
      default: null,
    },
    assignedProject: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      default: null,
    },
  },
  { timestamps: true }
);

const Story = mongoose.model("Story", storySchema);

export default Story;

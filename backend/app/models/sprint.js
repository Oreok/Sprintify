import mongoose from "mongoose";

const sprintSchema = mongoose.Schema({
  sprintTitle: {
    type: String,
    required: true,
  },
  sprintStartDate: {
    type: Date,
    required: true,
  },
  sprintEndDate: {
    type: Date,
    required: true,
  },
  assignedProject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
  },
  sprintBacklogItems: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Story",
    },
  ],
  sprintStats: {
    type: Object,
  },
  moved: {
    type: Boolean,
    default: false,
  },
});

const Sprint = mongoose.model("Sprint", sprintSchema);

export default Sprint;

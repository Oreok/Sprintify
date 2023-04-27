import mongoose from "mongoose";

const teamSchema = mongoose.Schema({
  teamTitle: {
    type: String,
    required: true,
  },
  teamDescription: {
    type: String,
    required: false,
  },
  members: [
    {
      type: mongoose.Schema.Types.ObjectID,
      ref: "User",
    },
  ],
});

const Team = mongoose.model("Team", teamSchema);

export default Team;

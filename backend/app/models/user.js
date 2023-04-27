import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    team: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
      default: null,
    },
    title: {
      type: String,
      default: "Keine Bezeichnung",
      enum: ["Keine Bezeichnung", "Software Developer", "UI/UX Designer", "Tester"],
    },
    location: {
      type: String,
      default: "Kein Standort",
      enum: ["Kein Standort", "Nürnberg", "Bamberg", "Kapstadt"],
    },
    active: { type: Boolean, default: process.env.beActiveOnRegister },
    role: {
      type: "String",
      default: "Mitarbeiter",
      enum: ["Mitarbeiter", "Admin", "Product Owner"],
    },
    image: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ImageUploder",
      default: null,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;

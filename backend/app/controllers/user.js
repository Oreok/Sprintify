import tryCatch from "./utils/tryCatch.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/user.js";
import Story from "../models/story.js";
import Team from "../models/team.js";
import {
  encodeRegistrationToken,
  decodeRegistrationToken,
} from "./utils/authUtils.js";
import { sendPasswordResetMail, sendVerificationMail } from "./utils/mailer.js";
import { notificationBaker } from "./utils/notficationBaker.js";
import Project from "../models/project.js";

export const adminUser = async () => {
  if ((await User.countDocuments()) === 0) {
    const pw = await bcrypt.hash("admin", 12);
    const user = await User.create({
      email: "admin@admin",
      password: pw,
      firstName: "admin",
      lastName: "admin",
      role: "Admin",
      active: true,
    });
  }
};

//Register User
export const register = tryCatch(async (req, res) => {
  let { firstName, lastName, email, password, title, location } = req.body; 

  if (title === null) {
    title = "Keine Bezeichnung";
    location = "Kein Standort";
  }

  //regex to check for valid mail
  const regex1 = /^[a-zA-Z_.-]+@stud.uni-bamberg.de/;
  const regex2 = /^[a-zA-Z_.-]+@uni-bamberg.de/;

  //check if email follows the required format
  if (!process.env.emailRegex) {
    if (regex1.test(email) == false || !regex2.test(email) == false)
      return res.status(400).json({
        success: false,
        message: "Diese Email-Adresse ist nicht gültig",
      });
  }

  
  if (password.length < 8)
    return res.status(400).json({
      success: false,
      message: "Passwort muss mindestens 2 Zeichen lang sein",
    });

  const emailLowerCase = email.toLowerCase();

  //check if email already exits in the database
  const existedUser = await User.findOne({ email: emailLowerCase });
  if (existedUser)
    return res.status(400).json({
      success: false,
      message: "Diese Email-Adresse existiert bereits",
    });

  //hash the password
  const hashedPassword = await bcrypt.hash(password, 12);

  //create a user in the database
  const user = await User.create({
    email: emailLowerCase,
    password: hashedPassword,
    firstName: firstName,
    lastName: lastName,
    title: title,
    location: location,
  });

  const { _id: id, role, active } = user;

  //sign a token for auth
  const token = jwt.sign(
    { id, lastName, emailLowerCase, role },
    process.env.JWT_TOKEN,
    {
      expiresIn: "1h",
    }
  );

  //create token used for account activation
  const verfifyToken = await encodeRegistrationToken(emailLowerCase);
  const result = await sendVerificationMail(emailLowerCase, verfifyToken);
  notificationBaker("SIGNUP", user);
  res.status(201).json({
    success: true,
    result: { id, firstName, email: email, token, role, active },
  });
});

//handle user login
export const login = tryCatch(async (req, res) => {
  let { email, password } = req.body;
  email = email.toLowerCase();
  //check if user exists in the database
  const existedUser = await User.findOne({ email: email });
  if (!existedUser)
    return res
      .status(404)
      .json({ success: false, message: "Dieser Nutzer existiert nicht!" });

  //compare passwords
  const correctPassword = await bcrypt.compare(password, existedUser.password);
  if (!correctPassword)
    return res
      .status(400)
      .json({ success: false, message: "Ungültige Eingabedaten!" });

  const {
    _id: id,
    firstName,
    lastName,
    role,
    active,
    location,
    title,
    team,
    image,
  } = existedUser;
  //check if user has an activated acc
  if (!active)
    return res.status(400).json({
      success: false,
      message:
        "Dieser Account ist noch nicht aktiviert! Bitte bestätigen Sie Ihre Email-Adresse",
    });

  //create a jwt token for auth
  const token = jwt.sign({ id, lastName, email, role }, process.env.JWT_TOKEN, {
    expiresIn: "1h",
  });
  res.status(200).json({
    success: true,
    result: {
      id,
      firstName,
      lastName,
      email,
      token,
      role,
      team,
      location,
      title,
      active,
      image,
    },
  });
});

//get all users and populate them with the corresponding team
export const getUsers = tryCatch(async (req, res) => {
  const users = await User.find()
    .sort({ _id: -1 })
    .populate("team")
    .select("-password")
    .exec();
  res.status(200).json({ success: true, result: users });
});

export const getProductOwners = tryCatch(async (req, res) => {
  const users = await User.find({ role: "Product Owner" })
    .select("firstName lastName email")
    .sort({ _id: -1 })
    .populate("team")
    .exec();
  res.status(200).json({ success: true, result: users });
});

//get user by id
export const getUser = tryCatch(async (req, res) => {
  const userid = req.params;
  const user = await User.findById(userid.userId);
  const {
    _id: id,
    firstName,
    lastName,
    email,
    role,
    team,
    location,
    title,
    image,
    active,
  } = user;

  //create a new token for auth, that gets stored in the local storage -> called after the user updates his profile
  const token = jwt.sign(
    { id, firstName, lastName, email, role },
    process.env.JWT_TOKEN,
    {
      expiresIn: "1h",
    }
  );
  res.status(200).json({
    success: true,
    result: {
      id,
      firstName,
      lastName,
      email,
      token,
      role,
      team,
      location,
      title,
      image,
      active,
    },
  });
});

//update user info - used for admin in the user management page
export const updateUser = tryCatch(async (req, res) => {
  const { firstName, lastName, email, role, team, title, active } = req.body;
  await User.findByIdAndUpdate(req.params.userId, {
    firstName,
    lastName,
    email,
    role,
    team,
    title,
    active,
  });
  res.status(200).json({ success: true, message: "User updated" });
});

//updateProfile - used for self update from the user /profile page
export const updateProfile = tryCatch(async (req, res) => {
  const fields = req.body?.password
    ? {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        title: req.body.title,
        location: req.body.location,
        password: req.body.password,
        image: req.body.image,
      }
    : {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        title: req.body.title,
        location: req.body.location,
        image: req.body.image,
      };

  //check if it received a password - if so hash it
  if (fields.password !== undefined) {
    const hashedPassword = await bcrypt.hash(fields.password, 12);
    fields.password = hashedPassword;
  }

  const updatedUser = await User.findByIdAndUpdate(req.user.id, fields, {
    new: true,
  });
  const {
    _id: id,
    firstName,
    lastName,
    email,
    role,
    team,
    active,
    title,
    location,
    image,
  } = updatedUser;

  const token = jwt.sign(
    { id, firstName, lastName, email, role },
    process.env.JWT_TOKEN,
    {
      expiresIn: "1h",
    }
  );
  res.status(200).json({
    success: true,
    result: {
      id,
      firstName,
      lastName,
      email,
      token,
      role,
      team,
      location,
      title,
      active,
      image,
    },
  });
});

// this function deletes a user from the database by finding the user by ID and removing it from the database
// it also removes the user from the team that they are a member of
export const deleteUser = tryCatch(async (req, res) => {
  const P0 = await Project.find({ productOwner: req.params.userId });
  if(P0.length > 0) {
    return res.status(400).json({ success: false, message: "User ist Product Owner und hat ein zugewiesenes Projekt" });
  };
  
  const result = await User.findByIdAndRemove(req.params.userId);
  await Team.findOneAndUpdate(
    { members: req.params.userId },
    { $pull: { members: req.params.userId } }
  );
  await Story.updateMany(
    { assignedUser: req.params.userId },
    { $set: { assignedUser: null, storyStatus: "TODO" } }
  );
  res
    .status(200)
    .json({ success: true, message: "Nutzer wurde gelöscht", result: result });
});

// this function is used to send a password reset email to the user
export const resetPassword = tryCatch(async (req, res) => {
  const { email } = req.body;
  //check if user exists
  const result = await User.findOne({ email });
  if (!result)
    return res
      .status(400)
      .json({ success: false, message: "Ungültige Nutzerdaten" });
  else {
    //create token with email
    const token = await encodeRegistrationToken(result.email);
    //send email
    const response = await sendPasswordResetMail(result.email, token);
    if (response.status === "error")
      return res.status(400).json({
        success: false,
        message: "Email konnte nicht gesendet werden!",
      }); 
  }
  res.status(200).json({
    success: true,
    message: "Email wurde gesendet",
    result: "Email sent",
  });
});

// this function accepts the token from the function above and resets the password
export const resetPasswordWithToken = tryCatch(async (req, res) => {
  const { token, password } = req.body;
  //decode the token to get the id of the user
  const decoded = await decodeRegistrationToken(token);
  // Handle the "Unexpected Token" error
  if (decoded.toString().includes("Unexpected token")) {
    return res
      .status(400)
      .json({ success: false, message: "Dieser Link ist ungültig" });
  } else if (decoded.toString().includes("TokenExpiredError")) {
    return res
      .status(400)
      .json({ success: false, message: "Dieser Link ist abgelaufen" });
  } else {
    //hash the new password
    const hashedPassword = await bcrypt.hash(password, 12);
    //update the password in the database
    const result = await User.findOneAndUpdate(
      { _id: decoded.id },
      { password: hashedPassword }
    );
    res.status(200).json({
      success: true,
      message: "Password updated",
      result: "password updated",
    });
  }
});

import userRouter from "./routes/userRouter.js";
import authRouter from "./routes/authRoutes.js";
import storyRouter from "./routes/storyRouter.js";
import teamRouter from "./routes/teamRouter.js";
import sprintRouter from "./routes/sprintRouter.js";
import notificationRouter from "./routes/notificationRouter.js";
import imageRouter from "./routes/imgRouter.js";
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import projectRouter from "./routes/projectRouter.js";
import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";
import { adminUser } from "./controllers/user.js";

const app = express();
const port = process.env.PORT || 4000;

//bodyParser Init
const urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(bodyParser.json(), urlencodedParser, cors());
app.use(cors());

//Database Connection
const dbURI = process.env.MONGODB_URI;

mongoose
  .connect(dbURI)
  .then((res) => {
    app.listen(process.env.PORT, () => console.log("Server is live"));
  })
  .then(adminUser())
  .catch((err) => console.log(err));

//set Headers
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With, Content-Type, Authorization"
  );
  next();
});

//Routers
const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "images")));

app.use("/user", userRouter);
app.use("/auth", authRouter);
app.use("/story", storyRouter);
app.use("/teams", teamRouter);
app.use("/sprint", sprintRouter);
app.use("/projects", projectRouter);
app.use("/notification", notificationRouter);
app.use("/image", imageRouter);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

import { Router } from "express";
import {
  addStory,
  updateStory,
  deleteStory,
  getStoriesByProject,
  getStoriesBySprint,
  getStoriesByTeam,
  getAllStories,
  getInProgressStoriesByUser,
  getKanbanStoriesByProject,
} from "../controllers/story.js";
import checkAccess from "../middleware/checkAccess.js";
import userPermissions from "../middleware/permissions/userPermissions.js";

const storyRouter = Router();

storyRouter.get("/", getAllStories);
storyRouter.post("/addStory", checkAccess(userPermissions.addStory), addStory);
storyRouter.put("/updateStory/:storyId", checkAccess(userPermissions.updateStory), updateStory);
storyRouter.delete("/deleteStory/:storyId", checkAccess(userPermissions.deleteStory), deleteStory);
storyRouter.get("/getStoriesByTeam/:teamId", getStoriesByTeam);
storyRouter.get("/getStoriesByProject/:projectId", getStoriesByProject);
storyRouter.get("/getStoriesBySprint/:sprintId", getStoriesBySprint);
storyRouter.get("/getInProgressStoriesByUser/:userId", getInProgressStoriesByUser);
storyRouter.get("/getKanbanStoriesByProject/:projectId", getKanbanStoriesByProject);

export default storyRouter;

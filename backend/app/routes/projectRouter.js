import { Router } from "express";
import {
  addProject,
  getAllProjects,
  getProjectById,
  getProjectStatsById,
  updateProject,
  deleteProject,
  getProjectStatsforTeam,
  getProjectsByTeam,
} from "../controllers/project.js";
import checkAccess from "../middleware/checkAccess.js";
import userPermissions from "../middleware/permissions/userPermissions.js";

const projectRouter = Router();

projectRouter.post("/addProject", checkAccess(userPermissions.addProject), addProject);
projectRouter.patch("/updateProject/:projectId", checkAccess(userPermissions.updateProject), updateProject);
projectRouter.delete("/deleteProject/:projectId", checkAccess(userPermissions.deleteProject), deleteProject);
projectRouter.get("/", getAllProjects);
projectRouter.get("/getProjectsByTeam/:teamId", getProjectsByTeam);
projectRouter.get("/getProjectById/:projectId", getProjectById);
projectRouter.get("/getProjectStatsById/:projectId", getProjectStatsById);
projectRouter.get("/getProjectStatsforTeam/:projectId/:teamId", getProjectStatsforTeam);
export default projectRouter;

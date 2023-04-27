import { Router } from "express";
import {
  addSprint,
  getSprintsByProject,
  getSprintById,
  getSprintStatsById,
  getSprintStatsByTeam,
  getActiveSprintByProject,
  deleteSprint,
  updateSprint,
  handleOldSprint,
  checkIfIsMoved,
} from "../controllers/sprint.js";
import checkAccess from "../middleware/checkAccess.js";
import userPermissions from "../middleware/permissions/userPermissions.js";

const sprintRouter = Router();

sprintRouter.post(
  "/addSprint",
  checkAccess(userPermissions.addSprint),
  addSprint
);
sprintRouter.delete(
  "/deleteSprint/:sprintId",
  checkAccess(userPermissions.deleteSprint),
  deleteSprint
);
sprintRouter.patch(
  "/updateSprint/:sprintId",
  checkAccess(userPermissions.updateSprint),
  updateSprint
);
sprintRouter.get("/getSprintsByProject/:projectId", getSprintsByProject);
sprintRouter.get("/getSprintById/:sprintId", getSprintById);
sprintRouter.get("/getSprintStatsById/:sprintId", getSprintStatsById);
sprintRouter.get("/getSprintStatsByTeam/:teamId", getSprintStatsByTeam);
sprintRouter.get(
  "/getActiveSprintByProject/:projectId",
  getActiveSprintByProject
);
sprintRouter.patch(
  "/handleOldSprint/:sprintId",
  checkAccess(userPermissions.updateSprint),
  handleOldSprint
);
sprintRouter.patch("/checkIfIsMoved/:sprintId", checkIfIsMoved);
export default sprintRouter;

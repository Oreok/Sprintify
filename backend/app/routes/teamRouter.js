import { Router } from "express";
import { getTeams, addTeam, getTeamsByProject, updateTeam, deleteTeam, getTeamById } from "../controllers/team.js";

const teamRouter = Router();

teamRouter.get("/", getTeams);
teamRouter.post("/addTeam", addTeam);
teamRouter.get("/getTeamsByProject/:projectId", getTeamsByProject);
teamRouter.get("/:teamId", getTeamById);
teamRouter.put("/updateTeam/:teamId", updateTeam);
teamRouter.delete("/deleteTeam/:teamId", deleteTeam);

export default teamRouter;

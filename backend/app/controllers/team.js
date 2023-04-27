import tryCatch from "./utils/tryCatch.js";
import bodyParser from "body-parser";
import Team from "../models/team.js";
import Users from "../models/user.js";
import Project from "../models/project.js";

const json = bodyParser.json();

export const getTeams = async (req, res) => {
  const teamsResult = await Team.find()
    .populate({
      path: "members",
      select: ["firstName", "lastName", "title", "image"],
      populate: { path: "image", select: ["filePath"] },
    })
    .exec();
  res.status(200).json({ success: true, result: teamsResult });
};

export const getTeamById = async (req, res) => {
  const teamId = req.params;
  const team = await Team.findById(teamId.teamId)
    .populate({
      path: "members",
      select: ["firstName", "lastName", "title", "image", "email"],
      populate: { path: "image", select: ["filePath"] },
    })
    .exec();
  res.status(200).json({
    success: true,
    result: team,
  });
};

export const addTeam = tryCatch(async (req, res) => {
  const team = req.body;
  //create Team
  const dbTeam = new Team({
    teamTitle: team.teamTitle,
    teamDescription: team.teamDescription,
    members: team.members,
  });
  const result = await dbTeam.save();
  await Users.updateMany(
    { _id: { $in: dbTeam.members } },
    { $set: { team: dbTeam._id } }
  );
  res
    .status(200)
    .json({ success: true, message: "Team created", result: result });
});

export const updateTeam = tryCatch(async (req, res) => {
  const { teamTitle, teamDescription, members, membersToRemove } = req.body;
  const { teamId } = req.params;
  const result = await Team.findByIdAndUpdate(teamId, {
    teamTitle,
    teamDescription,
    $addToSet: { members: members },
  });
  await Team.findByIdAndUpdate(teamId, {
    $pull: { members: { $in: membersToRemove } },
  });
  await Users.updateMany({ _id: { $in: members } }, { $set: { team: teamId } });
  await Users.updateMany(
    { _id: { $in: membersToRemove } },
    { $set: { team: null } }
  );
  res
    .status(200)
    .json({ success: true, message: "Team updadet", result: result });
});

export const getTeamsByProject = tryCatch(async (req, res) => {
  const { projectId } = req.params;
  const project = await Project.findById(projectId);
  const teamsResult = await Team.find({ _id: { $in: project.teams } });
  res.status(200).json({ success: true, result: teamsResult });
});

export const deleteTeam = tryCatch(async (req, res) => {
  const result = await Team.findByIdAndDelete(req.params.teamId);
  await Users.updateMany({ team: req.params.teamId }, { $set: { team: null } });
  res
    .status(200)
    .json({ success: true, message: "Team deleted", result: result });
});

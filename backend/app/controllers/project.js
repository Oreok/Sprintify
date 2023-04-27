import tryCatch from "./utils/tryCatch.js";
import bodyParser from "body-parser";
import Project from "../models/project.js";
import Story from "../models/story.js";
import Sprint from "../models/sprint.js";
const json = bodyParser.json();

export const getAllProjects = tryCatch(async (req, res) => {
  const projectResult = await Project.find();
  res.status(200).json({ success: true, result: projectResult });
});

export const getProjectsByTeam = tryCatch(async (req, res) => {
  const projectResult = await Project.find({ teams: req.params.teamId });
  res.status(200).json({ success: true, result: projectResult });
});


//Add Project
export const addProject = tryCatch(async (req, res) => {
  const project = req.body;

  //create Project
  const dbProject = new Project({
    projectName: project.projectName,
    teams: project.teams,
    projectDescription: project.projectDescription,
    productOwner: project.productOwner,
  });
  const result = await dbProject.save();
  res.json({ success: true, result: result});
});

export const getProjectById = tryCatch(async (req, res) => {
  const { projectId } = req.params;
  const projectResult = await Project.findById(projectId)
  .populate({
    path: "productOwner",
    select: ["firstName", "lastName", "image"],
    populate: { path: "image", select: ["filePath"] },
  })
  .exec();
  res.status(200).json({ success: true, result: projectResult });
});

export const getProjectStatsById = tryCatch(async (req, res) => {
  const { projectId } = req.params;
  const stories = await Story.find({
    assignedProject: projectId,
  });

  const allStories =
    stories !== null
      ? stories.filter((story) => {
          return story.assignedSprint == null;
        })
      : null;

  const allStorypoints =
    allStories === null || allStories.length !== 0
      ? allStories
          .map((story) => story.storypoints)
          .reduce((acc, points) => acc + points)
      : 0;

  const projectStats = { allStorypoints: allStorypoints };

  res.status(200).json({ success: true, result: projectStats });
});

export const getProjectStatsforTeam = tryCatch(async (req, res) => {
  const { projectId } = req.params;
  const { teamId } = req.params;
  const stories = await Story.find({
    assignedProject: projectId,
    assignedTeam: teamId,
  });

  const allStories =
    stories !== null
      ? stories.filter((story) => {
          return story.assignedSprint == null;
        })
      : null;

  const allStorypoints =
    allStories === null || allStories.length !== 0
      ? allStories
          .map((story) => story.storypoints)
          .reduce((acc, points) => acc + points)
      : 0;

  const projectStats = { allStorypoints: allStorypoints };

  res.status(200).json({ success: true, result: projectStats });
});


export const updateProject = tryCatch(async (req, res) => {
  const { projectId } = req.params;
  const project = req.body;

  const dbProject = await Project.findById(projectId);
  dbProject.projectName = project.projectName;
  dbProject.projectDescription = project.projectDescription;
  dbProject.teams = project.teams;
  dbProject.productOwner = project.productOwner;

  await dbProject.save();
  res.status(200).json({ success: true, message: "Project updated" });
});

export const deleteProject = tryCatch(async (req, res) => {
  const result = await Project.findByIdAndRemove(req.params.projectId);
  await Story.deleteMany({ assignedProject: req.params.projectId });
  await Sprint.deleteMany({ assignedProject: req.params.projectId });
  res
    .status(200)
    .json({ success: true, message: "Project deleted", result: result });
});

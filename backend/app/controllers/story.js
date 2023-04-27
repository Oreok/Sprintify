import tryCatch from "./utils/tryCatch.js";
import Story from "../models/story.js";
import Sprint from "../models/sprint.js";
import dayjs from "dayjs";
import { notificationBaker } from "./utils/notficationBaker.js";

//add Story
export const addStory = tryCatch(async (req, res) => {
  const { storyTitle, storyDescription, storyPriority, storypoints, assignedProject } = req.body;
  //create Story
  const dbStory = new Story({
    storyTitle: storyTitle,
    storyDescription: storyDescription,
    storyPriority: storyPriority,
    storypoints: storypoints,
    assignedProject: assignedProject,
  });
  await dbStory.save();
  const data = await Story.findById(dbStory._id).populate("assignedProject");
  await notificationBaker("CREATE_STORY", data);
  res.status(200).json({ success: true, message: "Story added" });
});

//update the Story (storyID is used to find the story and is passed in the URL)
export const updateStory = tryCatch(async (req, res) => {
  const {
    storyTitle,
    storyDescription,
    storyPriority,
    storypoints,
    storyStatus,
    assignedUser,
    assignedSprint,
    assignedProject,
  } = req.body;

  const story = await Story.findByIdAndUpdate(req.params.storyId, {
    storyTitle,
    storyDescription,
    storyPriority,
    storypoints,
    storyStatus,
    assignedUser,
    assignedSprint,
    assignedProject,
  });

  //if the storyStatus is not changed back to a TODO, a notification will be created (this is done because if a story is moved back to TODO it has no corresponding user)
  if (story.storyStatus !== storyStatus) {
    if (storyStatus !== "TODO") {
      const data = await Story.findById(story._id).populate("assignedProject").populate("assignedUser").exec();
      notificationBaker("UPDATE_STORY_STATUS", data);
    }
  }

  //this is used to update the sprint stats for the burndown-chart
  if (assignedSprint !== null) {
    const sprint = await Sprint.findById(assignedSprint);
    const today = dayjs().format("YYYY-MM-DD");

    //iterate through the sprintStats
    for (const element of sprint.sprintStats.dates) {
      //if the storyStatus is moved to DONE and the date is today, the storypoints will be added to the sprintStats
      if (storyStatus === "DONE") {
        if (element.date === today) {
          if (!element.stories.filter((storyId) => storyId.toString().includes(story._id)).length > 0) {
            element.storyPoints += storypoints;
            element.stories.push(story._id);
          }
        }
      }
      //if the storyStatus is changed back to IN_PROGRESS and the story is somewhere in the sprintStats, the storypoints will be subtracted from the sprintStats
      if (storyStatus === "IN_PROGRESS" || storyStatus === "TODO") {
        const storyIndex = element.stories.findIndex((storyId) => storyId.toString().includes(story._id));
        if (storyIndex !== -1) {
          element.storyPoints -= storypoints;
          element.stories = [...element.stories.slice(0, storyIndex), ...element.stories.slice(storyIndex + 1)];
        }
      }
    }
    const sprintStats = sprint.sprintStats;
    await Sprint.findByIdAndUpdate(assignedSprint, { sprintStats });
  }
  res.status(200).json({ success: true, message: "Story updated" });
});

//get all Stories populated with the user and the assigned project
export const getAllStories = tryCatch(async (req, res) => {
  const storiesResult = await Story.find()
    .populate({
      path: "assignedUser",
      select: ["firstName", "lastName", "title", "team"],
      populate: [{ path: "team" }, { path: "image", select: ["filePath"] }],
    })
    .exec();

  res.status(200).json({ success: true, result: storiesResult });
});

//get all Stories populated with the user, team and the assigned project
export const getStoriesByTeam = tryCatch(async (req, res) => {
  const storiesResult = await Story.find({ assignedTeams: req.params.teamId })
    .populate({
      path: "assignedUser",
      select: ["firstName", "lastName", "title", "team"],
      populate: [{ path: "team" }],
    })
    .populate("assignedProject")
    .exec();
  res.status(200).json({ success: true, result: storiesResult });
});

export const getStoriesByProject = tryCatch(async (req, res) => {
  const storiesResult = await Story.find({
    assignedProject: req.params.projectId,
  })
    .populate({
      path: "assignedUser",
      select: ["firstName", "lastName", "title", "team"],
      populate: [{ path: "team" }],
    })
    .populate("assignedProject", "projectName")
    .exec();
  res.status(200).json({ success: true, result: storiesResult });
});

export const getStoriesBySprint = tryCatch(async (req, res) => {
  const storiesResult = await Story.find({
    assignedSprint: req.params.sprintId,
  })
    .populate({
      path: "assignedUser",
      select: ["firstName", "lastName", "title", "team"],
      populate: [{ path: "team" }],
    })
    .exec();
  res.status(200).json({ success: true, result: storiesResult });
});

export const getInProgressStoriesByUser = tryCatch(async (req, res) => {
  const storiesResult = await Story.find({
    assignedUser: req.params.userId,
    storyStatus: "IN_PROGRESS",
  }).populate({ path: "assignedProject", select: ["projectName"] });
  res.status(200).json({ success: true, result: storiesResult });
});

export const getKanbanStoriesByProject = tryCatch(async (req, res) => {
  const sprintResult = await Sprint.find({ assignedProject: req.params.projectId });
  const activeSprint = sprintResult.filter((sprint) => {
    const today = new Date();
    const startDate = new Date(sprint.sprintStartDate);
    const endDate = new Date(sprint.sprintEndDate);
    return today >= startDate && today <= endDate;
  });
  if(activeSprint.length === 0) {
    return res.status(200).json({ success: true, result: [] });
  }
  const storiesResult = await Story.find({ assignedProject: req.params.projectId, assignedSprint: activeSprint[0]._id })
    .populate({
      path: "assignedUser",
      select: ["firstName", "lastName", "title", "team"],
      populate: [{ path: "team" }, { path: "image", select: ["filePath"] }],
    })
    .exec();
  res.status(200).json({ success: true, result: storiesResult });
});

//delete the Story (storyID is used to find the story and is passed in the URL)
export const deleteStory = tryCatch(async (req, res) => {
  const result = await Story.findByIdAndRemove(req.params.storyId);

  //find sprints the may have the story assigned and remove it from the sprintBacklogItems
  await Sprint.findByIdAndUpdate(req.body.assignedSprint, {
    $pull: { sprintBacklogItems: req.body.storyId },
  });

  res.status(200).json({ success: true, message: "Story deleted", result: result });
});

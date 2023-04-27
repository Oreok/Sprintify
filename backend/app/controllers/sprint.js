import tryCatch from "./utils/tryCatch.js";
import Sprint from "../models/sprint.js";
import Story from "../models/story.js";
import dayjs from "dayjs";
import { notificationBaker } from "./utils/notficationBaker.js";

export const addSprint = tryCatch(async (req, res) => {
  const {
    sprintTitle,
    sprintStartDate,
    sprintEndDate,
    assignedProject,
    sprintBacklogItems,
  } = req.body;

  const dbSprint = new Sprint({
    sprintTitle: sprintTitle,
    sprintStartDate: sprintStartDate,
    sprintEndDate: sprintEndDate,
    assignedProject: assignedProject,
    sprintBacklogItems: sprintBacklogItems,
  });
  const result = await dbSprint.save();

  sprintBacklogItems.forEach(async (storyId) => {
    const story = await Story.findById(storyId);
    story.assignedSprint = result._id;
    await story.save();
  });

  populateSprintStats(result._id);

  const data = await Sprint.findById(result._id).populate("assignedProject");
  await notificationBaker("CREATE_SPRINT", data);

  res.status(201).json({
    success: true,
    message: "Sprint added successfully",
    result: result,
  });
});

export const getSprintsByProject = tryCatch(async (req, res) => {
  const { projectId } = req.params;
  const sprintResult = await Sprint.find({ assignedProject: projectId });
  res.status(200).json({ success: true, result: sprintResult });
});

export const getSprintById = tryCatch(async (req, res) => {
  const { sprintId } = req.params;
  const sprintResult = await Sprint.findById(sprintId);
  res.status(200).json({ success: true, result: sprintResult });
});

export const getSprintStatsById = tryCatch(async (req, res) => {
  const { sprintId } = req.params;
  const sprintResult = await Sprint.findById(sprintId)
    .populate("sprintBacklogItems")
    .exec();

  const sprintBacklogItems = sprintResult.sprintBacklogItems;

  const allStorypoints = sprintBacklogItems.length
    ? sprintBacklogItems
        .map((story) => story.storypoints)
        .reduce((acc, points) => acc + points)
    : 0;

  const sprintBacklogItemsLength = sprintBacklogItems.length;
  const done = sprintBacklogItems.filter((item) => item.storyStatus === "DONE");

  const doneStorypoints = done.length
    ? done
        .map((story) => story.storypoints)
        .reduce((acc, points) => acc + points)
    : 0;

  const doneLength = done.length;

  const inProgress = sprintBacklogItems.filter(
    (item) => item.storyStatus === "IN_PROGRESS"
  );
  const inProgressStorypoints = inProgress.length
    ? inProgress
        .map((story) => story.storypoints)
        .reduce((acc, points) => acc + points)
    : 0;

  const inProgressLength = inProgress.length;

  const todo = sprintBacklogItems.filter((item) => item.storyStatus === "TODO");

  const todoStorypoints = todo.length
    ? todo
        .map((story) => story.storypoints)
        .reduce((acc, points) => acc + points)
    : 0;

  const todoLength = todo.length;

  const result = {
    allStorypoints: allStorypoints,
    doneStorypoints: doneStorypoints,
    inProgressStorypoints: inProgressStorypoints,
    todoStorypoints: todoStorypoints,
    doneLength: doneLength,
    inProgressLength: inProgressLength,
    todoLength: todoLength,
    sprintBacklogItemsLength: sprintBacklogItemsLength,
  };

  res.status(200).json({ success: true, result: result });
});

export const getSprintStatsByTeam = tryCatch(async (req, res) => {
  const { teamId } = req.params;
  const sprintResult = await Sprint.find({ assignedTeam: teamId });
  const allSprints = sprintResult.map((sprint) => sprint._id);
  // get stats of all sprints by team
  const allSprintStats = await Promise.all(
    allSprints.map(async (sprintId) => {
      const sprintResult = await Sprint.findById(sprintId)
        .populate("sprintBacklogItems")
        .exec();

      const sprintBacklogItems = sprintResult.sprintBacklogItems;

      const allStorypoints = sprintBacklogItems.length
        ? sprintBacklogItems
            .map((story) => story.storypoints)
            .reduce((acc, points) => acc + points)
        : 0;

      const sprintBacklogItemsLength = sprintBacklogItems.length;
      const done = sprintBacklogItems.filter(
        (item) => item.storyStatus === "DONE"
      );

      const doneStorypoints = done.length
        ? done
            .map((story) => story.storypoints)
            .reduce((acc, points) => acc + points)
        : 0;

      const doneLength = done.length;

      const inProgress = sprintBacklogItems.filter(
        (item) => item.storyStatus === "IN_PROGRESS"
      );
      const inProgressStorypoints = inProgress.length
        ? inProgress
            .map((story) => story.storypoints)
            .reduce((acc, points) => acc + points)
        : 0;

      const inProgressLength = inProgress.length;

      const todo = sprintBacklogItems.filter(
        (item) => item.storyStatus === "TODO"
      );

      const todoStorypoints = todo.length
        ? todo
            .map((story) => story.storypoints)
            .reduce((acc, points) => acc + points)
        : 0;

      const todoLength = todo.length;

      const result = {
        allStorypoints: allStorypoints,
        doneStorypoints: doneStorypoints,
        inProgressStorypoints: inProgressStorypoints,
        todoStorypoints: todoStorypoints,
        doneLength: doneLength,
        inProgressLength: inProgressLength,
        todoLength: todoLength,
        sprintBacklogItemsLength: sprintBacklogItemsLength,
      };

      res.status(200).json({ success: true, result: result });
    })
  );
});

export const getActiveSprintByProject = tryCatch(async (req, res) => {
  const { projectId } = req.params;
  const sprintResult = await Sprint.find({ assignedProject: projectId });
  const activeSprint = sprintResult.filter((sprint) => {
    const today = new Date();
    const startDate = new Date(sprint.sprintStartDate);
    const endDate = new Date(sprint.sprintEndDate);
    return today >= startDate && today <= endDate;
  });

  res.status(200).json({ success: true, result: activeSprint });
});

export const deleteSprint = tryCatch(async (req, res) => {
  const result = await Sprint.findByIdAndRemove(req.params.sprintId).populate(
    "assignedProject"
  );
  await Story.updateMany(
    { assignedSprint: req.params.sprintId },
    { $set: { assignedSprint: null } }
  );
  await notificationBaker("DELETE_SPRINT", result);
  res
    .status(200)
    .json({ success: true, message: "Sprint deleted", result: result });
});

const populateSprintStats = async (sprintId) => {
  const sprintResult = await Sprint.findById(sprintId)
    .populate("sprintBacklogItems")
    .exec();

  const sprintBacklogItems = sprintResult.sprintBacklogItems;

  let allStorypoints = sprintBacklogItems.length
    ? sprintBacklogItems
        .map((story) => story.storypoints)
        .reduce((acc, points) => acc + points)
    : 0;

  let startDate = dayjs(sprintResult.sprintStartDate);
  const endDate = dayjs(sprintResult.sprintEndDate).add(1, "day");
  let workdays = 0;

  const dateObject = {
    stats: {
      allStorypoints: allStorypoints,
      doneStorypoints: 0,
      inProgressStorypoints: 0,
      todoStorypoints: 0,
    },
    dates: [],
  };

  while (startDate.isBefore(endDate)) {
    if (startDate.get("day") === 6 || startDate.get("day") === 0) {
      dateObject.dates.push({
        date: startDate.format("YYYY-MM-DD"),
        storyPoints: null,
        storyPointsRemaining: null,
        storyPointsIdeal: 0,
        stories: [],
      });
      startDate = startDate.add(1, "day");
    } else {
      dateObject.dates.push({
        date: startDate.format("YYYY-MM-DD"),
        storyPoints: null,
        storyPointsRemaining: null,
        storyPointsIdeal: 0,
        stories: [],
      });
      workdays++;
      startDate = startDate.add(1, "day");
    }
  }

  dateObject.dates.map((day) => {
    if (dayjs(day.date).get("day") === 6 || dayjs(day.date).get("day") === 0) {
      day.storyPointsIdeal = 0;
    } else {
      day.storyPointsIdeal = allStorypoints / workdays;
    }
  });

  await Sprint.findByIdAndUpdate(sprintId, { sprintStats: dateObject });
};

export const updateSprint = tryCatch(async (req, res) => {
  const { sprintId } = req.params;
  const { sprintTitle, sprintStartDate, sprintEndDate } = req.body;

  const dbSprint = await Sprint.findById(sprintId);

  dbSprint.sprintTitle = sprintTitle;
  dbSprint.sprintStartDate = new Date(sprintStartDate);
  dbSprint.sprintEndDate = new Date(sprintEndDate);

  await dbSprint.save();
  res.status(200).json({ success: true, message: "Sprint updated" });
});

export const handleOldSprint = tryCatch(async (req, res) => {
  const sprint = await Sprint.findById(req.params.sprintId);
  sprint.moved = true;
  await sprint.save();

  const result = await Story.updateMany(
    { assignedSprint: req.params.sprintId, storyStatus: { $ne: "DONE" } },
    { $set: { assignedSprint: null } }
  );

  res
    .status(200)
    .json({ success: true, message: "Stories moved", result: result });
});

export const checkIfIsMoved = tryCatch(async (req, res) => {
  const sprint = await Sprint.findById(req.params.sprintId);

  if (dayjs(sprint?.sprintEndDate).isBefore(dayjs())) {
    const stories = await Story.find({
      assignedSprint: req.params.sprintId,
      storyStatus: { $ne: "DONE" },
    });
    if (stories.length === 0) {
      sprint.moved = true;
    }
    await sprint.save();
  }
  res.status(200).json({ success: true, result: sprint });
});

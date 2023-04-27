import Notification from "../../models/notification.js";
import dayjs from "dayjs";

/*
The notification Baker is used to create a notification object based on the notification type and 
the item that is passed to the function. It "bakes" a notification with the corresponding information and saves it in the database.
the project argument is used to assign the notification to the user in the filtering process.
*/

export const notificationBaker = async (notificationType, item) => {
  let notification = null;

  switch (notificationType) {
    case "CREATE_SPRINT":
      notification = new Notification({
        notificationType: notificationType,
        notificationTitle: "Sprint erstellt",
        notificationDescription: `Der Sprint "${
          item.sprintTitle
        }" wurde im Projekt "${
          item.assignedProject.projectName
        }" erstellt. \b Zeitraum: ${dayjs(item.sprintStartDate).format(
          "DD.MM.YY"
        )} - ${dayjs(item.sprintEndDate).format("DD.MM.YY")}`,
        project: item.assignedProject,
      });
      break;
    case "DELETE_SPRINT":
      notification = new Notification({
        notificationType: notificationType,
        notificationTitle: "Sprint gelöscht",
        notificationDescription: `Der Sprint "${item.sprintTitle}" wurde im Projekt "${item.assignedProject.projectName}" gelöscht.`,
        project: item.assignedProject,
      });
      break;
    case "CREATE_STORY":
      notification = new Notification({
        notificationType: notificationType,
        notificationTitle: "Story erstellt",
        notificationDescription: `Die Story "${item.storyTitle}" wurde im Projekt "${item.assignedProject.projectName}" erstellt`,
        project: item.assignedProject,
      });
      break;

    case "DELETE_STORY":
      notification = new Notification({
        notificationType: notificationType,
        notificationTitle: "Story gelöscht",
        notificationDescription: `Die Story "${item.storyTitle}" wurde im Projekt "${item.assignedProject.projectName}" gelöscht`,
        project: item.assignedProject,
      });
      break;
    case "UPDATE_STORY_STATUS":
      let status;
      if (item.storyStatus === "DONE") {
        status = "Done ✅";
      } else if (item.storyStatus === "IN_PROGRESS") {
        status = "In Progress ⏳";
      } else if (item.storyStatus === "TO_DO") {
        status = "To Do 📝";
      }

      notification = new Notification({
        notificationType: notificationType,
        notificationTitle: "Story Status verändert",
        notificationDescription: `"${item.storyTitle}" wurde von ${item.assignedUser.firstName} ${item.assignedUser.lastName} auf ${status} geschoben - Projekt "${item.assignedProject.projectName}"`,
        project: item.assignedProject,
      });
      break;
    case "SIGNUP":
      notification = new Notification({
        notificationType: notificationType,
        notificationTitle: "Registrierung erfolgreich",
        notificationDescription: `Herzlich Willkommen bei Sprintify ${item.firstName} 🎉🎉🎉. Schön, dass du mit dabei bist!`,
        user: item._id,
      });
      break;
  }
  await notification.save();
};

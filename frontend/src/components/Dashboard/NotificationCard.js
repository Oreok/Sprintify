import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import QueueIcon from "@mui/icons-material/Queue";
import UpdateIcon from "@mui/icons-material/Update";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import CelebrationIcon from "@mui/icons-material/Celebration";
import "dayjs/locale/de";

export default function NotificationCard(props) {
  const timeCalculation = (createdAt) => {
    dayjs.extend(relativeTime);
    dayjs.locale("de");
    const time = dayjs(createdAt).fromNow();
    return time;
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        gap: 3,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          pb: 4,
        }}
      >
        {props.item?.notificationType === "DELETE_TEAMMEMBER" ||
        props.item?.notificationType === "DELETE_SPRINT" ? (
          <DeleteForeverIcon
            sx={{
              fontSize: "40px",
              bgcolor: "#F5C3CD",
              color: "#E64969",
              borderRadius: "6px",
              p: 0.8,
            }}
          />
        ) : props.item?.notificationType === "CREATE_SPRINT" ||
          props.item?.notificationType === "CREATE_STORY" ||
          props.item?.notificationType === "ADD_TEAMMEMBER" ? (
          <QueueIcon
            sx={{
              fontSize: "40px",
              bgcolor: "#C0EADB",
              color: "#56C291",
              borderRadius: "6px",
              p: 1,
            }}
          />
        ) : props.item?.notificationType === "SIGNUP" ? (
          <CelebrationIcon
            sx={{
              fontSize: "40px",
              bgcolor: "#C0EADB",
              color: "#56C291",
              borderRadius: "6px",
              p: 1,
            }}
          />
        ) : (
          <UpdateIcon
            sx={{
              fontSize: "40px",
              bgcolor: "#FCE6C6",
              color: "#F6A919",
              borderRadius: "6px",
              p: 1,
            }}
          />
        )}
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Typography
          variant="h6"
          sx={{ fontWeight: "bold", textAlign: "start", fontSize: "17px" }}
        >
          {props.item?.notificationTitle}
        </Typography>
        <Typography
          variant="body"
          sx={{
            display: "-webkit-box",
            overflow: "hidden",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 3,
            textAlign: "start",
            fontSize: "14.5px",
          }}
        >
          {props.item?.notificationDescription}
        </Typography>
        <Box
          sx={{
            display: "flex",
            gap: 1,
            color: "grey",
            textAlign: "start",
            alignItems: "center",
            fontSize: "13px",
          }}
        >
          <AccessTimeFilledIcon sx={{ fontSize: "15.5px" }} />
          <Typography variant="body">
            {timeCalculation(props.item?.createdAt)}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

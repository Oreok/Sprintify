import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import NotificationCard from "./NotificationCard";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import Skeleton from "@mui/material/Skeleton";

export default function NotificationBox(props) {
  const notificationItems = props?.notifications?.map((item) => {
    return (
      <div key={item._id}>
        <NotificationCard item={item} />
        <Divider />
      </div>
    );
  });

  return (
    <Box
      sx={{
        borderRadius: "6px",
        boxShadow: 3,
        width: "450px",
        bgcolor: "background.secondary",
        color: "text.default",
        height: "100%",
      }}
    >
      {props.loading ? (
        <Box sx={{ p: 2 }}>
          <Skeleton variant="rectangular" width={"100%"} height={"60vh"} />
        </Box>
      ) : (
        <>
          <Box
            sx={{
              display: "flex",
              ml: 2,
              mr: 7,
              mb: 1,
              gap: 1,
              pt: 2,
              height: "10%",
            }}
          >
            <NotificationsActiveIcon sx={{ fontSize: "30px" }} />
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              Benachrichtigungen
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "stretch",
              overflow: "auto",
              gap: 2,
              px: 2,
              height: "85%",
            }}
          >
            {notificationItems}
          </Box>
        </>
      )}
    </Box>
  );
}

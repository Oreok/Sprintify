import * as React from "react";
import { Avatar, Card, CardContent } from "@mui/material";
import { Box } from "@mui/system";
import Typography from "@mui/material/Typography";
import AvatarGroup from "@mui/material/AvatarGroup";

export default function TeamCard(props) {
  const url = process.env.REACT_APP_backendURL + "/images/";

  return (
    <Card
      sx={{
        textAlign: "left",
        minWidth: "250px",
        maxWidth: "250px",
        boxShadow: 3,
        color: "text.default",
        borderRadius: "5%",
      }}
    >
      <CardContent>
        <Box>
          <Typography sx={{ fontSize: 14, color: "text.default" }} gutterBottom>
            Team
          </Typography>
          <Typography
            sx={{
              color: "text.default",
              textOverflow: "ellipsis",
              overflow: "hidden",
              whiteSpace: "nowrap",
            }}
            variant="h5"
            component="div"
          >
            {props.team.teamTitle}
          </Typography>
          <AvatarGroup max={5} sx={{ my: 3, justifyContent: "center" }}>
            {props.team.members.map((user) => (
              <Avatar
                src={user?.image ? url + user?.image.filePath : ""}
                key={user._id}
              >
                {(user?.firstName?.charAt(0) +
                  user?.lastName?.charAt(0)).toString()}
              </Avatar>
            ))}
          </AvatarGroup>
          <Typography
            sx={{
              display: "-webkit-box",
              overflow: "hidden",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 5,
              mb: 1,
            }}
          >
            {props.team.teamDescription}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}

import * as React from "react";
import { Avatar, Card, CardContent } from "@mui/material";
import { Box } from "@mui/system";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import dayjs from "dayjs";
import { useParams } from "react-router-dom";
import history from "../../history";

export default function SprintElements(props) {
  let { projectId } = useParams();

  return (
    <Card
      sx={{
        minWidth: 320,
        maxWidth: 320,
        boxShadow: 3,
        color: "white",
      }}
    >
      <CardContent sx={{ m: 1 }}>
        <Box>
          <Typography
            align="left"
            sx={{
              display: "-webkit-box",
              overflow: "hidden",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 2,
              fontWeight: "bold",
              pb: 1,
            }}
          >
            {props.sprint.sprintTitle}
          </Typography>
          <Typography align="left" variant="subtitle2" gutterBottom>
            {dayjs(props.sprint.sprintStartDate).format("DD.MM.YYYY")} -{" "}
            {dayjs(props.sprint.sprintEndDate).format("DD.MM.YYYY")}
          </Typography>
          <Box
            display="flex"
            justifyContent="flex-start"
            sx={{
              mt: 2,
            }}
          >
            <Button sx={{ mr: 2 }} variant="card-button" type="submit">
              Bearbeiten
            </Button>
            <Button
              variant="card-button"
              onClick={() => {
                history.push(
                  "/project/" + projectId + "/sprint/" + props.sprint._id
                );
                window.location.reload();
              }}
            >
              Sprint-Backlog
            </Button>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

import * as React from "react";
import { Avatar, Card, CardContent } from "@mui/material";
import "./Kanban.css";
import { Box } from "@mui/system";
import NoAccountsIcon from "@mui/icons-material/PersonOff";
import StoryDescribtion from "./StoryDescribtion";
import Typography from "@mui/material/Typography";
import StoryButtons from "./StoryButtons";
import { useValue } from "../../context/ContextProvider";
import { Draggable } from "react-beautiful-dnd";
import { Container } from "@mui/material";

export default function Story(props) {
  const [showDescribtion, setShowDescribtion] = React.useState(false);
  const url = process.env.REACT_APP_backendURL + "/images/";
  const handleUser = () => {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
        }}
      >
        <Avatar
          sx={{ width: 30, height: 30 }}
          src={
            props?.story.assignedUser?.image
              ? url + props?.story.assignedUser?.image.filePath
              : ""
          }
        >
          {props.story.assignedUser === null ? (
            <NoAccountsIcon />
          ) : (
            (props?.story.assignedUser?.firstName?.charAt(0) +
              props?.story.assignedUser?.lastName?.charAt(0)).toString()
          )}
        </Avatar>

        <p>
          {props.story.assignedUser == null
            ? "Nicht zugewiesen"
            : props?.story.assignedUser?.firstName +
            " " +
            props?.story.assignedUser?.lastName}
        </p>
      </Box>
    );
  };

  return (
    <Draggable
      key={props.story._id}
      draggableId={props.story._id}
      index={props.index}
    >
      {(provided, snapshot) => (
        <Box
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <Card sx={{ width: "18vw", boxShadow: 3 }} variant="card-white">
            <StoryDescribtion
              show={showDescribtion}
              close={() => setShowDescribtion(false)}
              story={props.story}
            />
            <CardContent
              sx={{
                "&:last-child": {
                  paddingBottom: 1,
                },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 1,
                  pb: 1,
                }}
              >
                {handleUser()}

                <Box>
                  <p>
                    {props.story.assignedUser !== null
                      ? props?.story.assignedUser?.team?.teamTitle
                      : ""}
                  </p>
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  gap: 1,
                  py: 4,
                  cursor: "pointer",
                }}
                onClick={() => {
                  setShowDescribtion(true);
                }}
              >
                <Typography
                  align="left"
                  sx={{
                    display: "-webkit-box",
                    overflow: "hidden",
                    WebkitBoxOrient: "vertical",
                    WebkitLineClamp: 2,
                    fontWeight: "bold",
                  }}
                >
                  {props.story.storyTitle}
                </Typography>
              </Box>
              <StoryButtons
                story={props.story}
                showDescribtion={setShowDescribtion}
              />
            </CardContent>
          </Card>
        </Box>
      )}
    </Draggable>
  );
}

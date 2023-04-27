import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Droppable } from "react-beautiful-dnd";
import Skeleton from "@mui/material/Skeleton";

export default function Status(props) {
  return (
    <Droppable droppableId={props.droppableId}>
      {(provided) => (
        <Box
          ref={provided.innerRef}
          {...provided.droppableProps}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "center",
            gap: 2,
            bgcolor: "background.secondary",
            color: "text.default",
            p: 2,
            borderRadius: "16px",
            height: "100%",
            minHeight: "25vh",
            width: "20vw",
          }}
        >
          {props.loading ? (
            <Skeleton variant="rectangular" width={"100%"} height={"250px"} />
          ) : (
            <>
              <Box display="flex" sx={{ gap: 1 }}>
                {props.name}
                <Typography sx={{ color: "#a0a0a0" }}>
                  {props.storyElements !== undefined
                    ? props.storyElements.length
                    : 0}
                </Typography>
              </Box>
              {props.storyElements}
              {provided.placeholder}
            </>
          )}
        </Box>
      )}
    </Droppable>
  );
}

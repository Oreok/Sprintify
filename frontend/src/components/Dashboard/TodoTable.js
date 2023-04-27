import React from "react";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import Typography from "@mui/material/Typography";
import ListAltIcon from "@mui/icons-material/ListAlt";
import StoryDescribtion from "../Kanban/StoryDescribtion";

export default function TodoTable(props) {
  const [showStory, setShowStory] = React.useState(false);
  const [selectedStory, setSelectedStory] = React.useState({});
  const closeShowStory = () => {
    setShowStory(false);
  };

  props.tableData.map((story) => {
    if (story.storyPriority === "Hoch") {
      story.storyPriority = "Hoch ⚡️";
    } else if (story.storyPriority === "Mittel") {
      story.storyPriority = "Mittel";
    } else if (story.storyPriority === "Niedrig") {
      story.storyPriority = "Niedrig";
    }
  });


  const columns = [
    {
      field: "_id",
      headerName: "ID",
      width: 0,
      editable: false,
      hide: true,
    },
    {
      field: "storyTitle",
      headerName: "Titel",
      width: 330,
      editable: false,
    },
    {
      field: "storypoints",
      headerName: "Storypoints",
      width: 95,
      editable: false,
    },
    {
      field: "storyPriority",
      headerName: "Priorität",
      width: 110,
      editable: false,
    },
    {
      field: "projectName",
      headerName: "Projekt",

      width: 180,
      editable: false,
    },
  ];

  return (
    <Box
      sx={{
        height: "100%",
        p: 2,
        borderRadius: "6px",
        boxShadow: 3,
        bgcolor: "background.secondary",
        color: "text.default",
        pb: 9,
      }}
    >
      {props.loading ? (
        <Skeleton variant="rectangular" width={"100%"} height={"60vh"} />
      ) : (
        <>
          <StoryDescribtion
            story={selectedStory}
            show={showStory}
            close={closeShowStory}
            editable={false}
          />
          <Box
            sx={{
              display: "flex",
              mb: 2,
              mt: 0,
              gap: 1,
            }}
          >
            <ListAltIcon sx={{ fontSize: "30px" }} />
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              {props.role === "Product Owner"
                ? "Offene Stories deines Projekts"
                : "Deine offenen Stories"}
            </Typography>
          </Box>
          <DataGrid
            sx={{}}
            rows={props.tableData}
            columns={columns}
            pageSize={6}
            rowsPerPageOptions={[5]}
            getRowId={(rows) => rows._id}
            onRowClick={(row) => {
              setSelectedStory(row.row);
              setShowStory(true);
            }}
            initialState={{
              sorting: {
                sortModel: [{ field: "storyPriority", sort: "asc" }],
              },
            }}
          />
        </>
      )}
    </Box>
  );
}

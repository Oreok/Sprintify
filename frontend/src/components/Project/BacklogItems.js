import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useParams } from "react-router-dom";
import StoryDescribtion from "../Kanban/StoryDescribtion";
import { Button, IconButton } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";

export default function BacklockItems(props) {
  const stories = props?.stories;
  const [showTeamColumn, setShowTeamColumn] = React.useState(true);
  const [showStory, setShowStory] = React.useState(false);
  const [selectedStory, setSelectedStory] = React.useState({});
  const closeShowStory = () => {
    setShowStory(false);
  };

  let { projectId, sprintId } = useParams();
  if (sprintId !== undefined && projectId === undefined) {
    setShowTeamColumn(false);
  }

  const teams = props.teams?.filter((team) => {
    if (props.project?.teams.includes(team._id)) {
      return team;
    }
  });

  let rows = [];

  if (stories !== null) {
    if (sprintId === undefined) {
      rows = stories
        ?.filter((story) => {
          return story.assignedSprint == null;
        })
        ?.map((story) => ({
          _id: story._id,
          titel: story.storyTitle,
          storypoints: story.storypoints,
          priorität: story.storyPriority,
          story: story,
        }));
    } else {
      rows = stories?.map((story) => ({
        _id: story._id,
        titel: story.storyTitle,
        storypoints: story.storypoints,
        priorität: story.storyPriority,
        story: story,
      }));
    }
  }

  const columns = [
    {
      field: "_id",
      headerName: "ID",
      width: 190,
      editable: false,
      hide: true,
    },
    {
      field: "titel",
      headerName: "Titel",
      width: 350,
      editable: false,
    },
    {
      field: "storypoints",
      headerName: "Storypoints",
      width: 150,
      editable: false,
    },
    {
      field: "priorität",
      headerName: "Priorität",
      width: 150,
      editable: false,
    },
    {
      field: "team",
      headerName: "Team",
      type: "singleSelect",
      valueOptions: teams?.map((team) => team.teamTitle),
      width: 250,
      editable: true,
      hide: showTeamColumn,
    },
    {
      field: "details",
      headerName: "Details",
      type: "actions",
      width: 150,
      renderCell: (params) => (
        <>
          <IconButton
            variant="default"
            onClick={() => {
              setShowStory(true);
            }}
          >
            <InfoIcon sx={{ fontSize: "30px" }} />
          </IconButton>
        </>
      ),
    },
  ];
  return (
    <>
      <StoryDescribtion
        story={selectedStory}
        show={showStory}
        close={closeShowStory}
        editable={props?.editable}
      />
      <Box
        sx={{
          height: 400,
          width: "98%",
          mx: "1%",
          my: "25px",
        }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection={props.showSelection}
          disableSelectionOnClick
          disableColumnFilter
          disableColumnSelector
          disableDensitySelector
          onSelectionModelChange={(id) => {
            const selectedIDs = new Set(id);
            const selectedRowData = rows.filter((row) =>
              selectedIDs.has(row._id)
            );
            props.setSelectedItems(selectedRowData);
          }}
          components={{ Toolbar: GridToolbar }}
          componentsProps={{
            toolbar: {
              showQuickFilter: true,
              quickFilterProps: { debounceMs: 500 },
            },
          }}
          onCellClick={(params) => {
            setSelectedStory(params.row.story);
          }}
          getRowId={(rows) => rows._id}
          experimentalFeatures={{ newEditingApi: true }}
        />
      </Box>
    </>
  );
}

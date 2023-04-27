import React from "react";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TeamCard from "../../components/Teams/TeamCard";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { useValue } from "../../context/ContextProvider";
import { getAllTeams } from "../../actions/team";
import Layout from "../../layout";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import InputAdornment from "@mui/material/InputAdornment";
import BreadCrumbBar from "../../components/BreadCrumbBar";
import { endLoading, startLoading } from "../../actions/utils/loading";
import Skeleton from "@mui/material/Skeleton";

export default function TeamsMangement() {
  const {
    state: { currentUser, teams, loading },
    dispatch,
  } = useValue();

  const Navigate = useNavigate();

  useEffect(() => {
    startLoading(dispatch);
    if (currentUser !== null) {
      getAllTeams(dispatch, currentUser);
    }
  }, [currentUser]);

  useEffect(() => {
    if (teams !== null) {
      endLoading(dispatch);
    }
  }, [teams]);

  const [inputText, setInputText] = useState("");
  let inputHandler = (e) => {
    //convert input text to lower case
    var lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };

  // Breadcrumb information
  const breadCrumbInfo = [
    { name: "Dashboard", link: "/dashboard/" },
    { name: "Teams-Verwaltung" },
  ];

  return (
    <Layout
      inhalt={
        <>
          <BreadCrumbBar
            breadCrumbInfo={breadCrumbInfo}
            backButtonLink={"/dashboard"}
            loading={loading}
          />
          <Box
            sx={{
              bgcolor: "background.secondary",
              color: "text.default",
              mb: 5,
              p: 2,
              width: "90%",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "10px",
            }}
          >
            {loading ? (
              <Skeleton variant="rectangular" width={"100%"} height={"600px"} />
            ) : (
              <>
                <Box
                  display="flex"
                  sx={{ alignItems: "center", justifyContent: "space-between" }}
                >
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{ fontWeight: "bold", pl: 2 }}
                  >
                    Teams-Verwaltung
                  </Typography>

                  <Button
                    onClick={() => {
                      Navigate(`/createTeam`);
                    }}
                    variant="create-button"
                    sx={{ mr: 2 }}
                  >
                    <AddIcon sx={{ mr: 1 }} /> Team Hinzufügen
                  </Button>
                </Box>
                <Box
                  sx={{
                    alignItems: "left",
                    justifyContent: "space-between",
                    textAlign: "left",
                    mb: 1,
                    p: 2,
                  }}
                >
                  <TextField
                    id="outlined-helperText"
                    label="Teams durchsuchen"
                    defaultValue=""
                    //helperText="Suche nach Team Name"
                    onChange={inputHandler}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchRoundedIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Box>
                <Box
                  sx={{
                    mb: 5,
                    p: 2,
                  }}
                >
                  <Grid container alignItems="stretch">
                    <Grid item xs>
                      <TeamCard
                        input={inputText}
                        team={teams}
                        dispatch={dispatch}
                        currentUser={currentUser}
                        close={() => {
                          getAllTeams(dispatch, currentUser);
                        }}
                      />
                    </Grid>
                  </Grid>
                </Box>
              </>
            )}
          </Box>
        </>
      }
    />
  );
}

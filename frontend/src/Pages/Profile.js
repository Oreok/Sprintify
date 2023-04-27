import React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { getImageById } from "../actions/image";
import { getTeamById } from "../actions/team";
import { useValue } from "../context/ContextProvider";
import { useEffect } from "react";
import ProfileTable from "../components/Profile/ProfileTable";
import TeamView from "../components/Profile/TeamView";
import UserProjects from "../components/Profile/UserProjects";
import { getProjectsByTeam } from "../actions/project";
import Paper from "@mui/material/Paper";
import EditProfile from "../components/Profile/EditProfile";
import Layout from "../layout";
import Typography from "@mui/material/Typography";
import DeleteModal from "../components/DeleteModal";
import { endLoading, startLoading } from "../actions/utils/loading";
import BreadCrumbBar from "../components/BreadCrumbBar";
import { Card, Skeleton } from "@mui/material";

export default function Profile() {
  // Breadcrumb information
  const breadCrumbInfo = [
    { name: "Dashboard", link: "/dashboard/" },
    { name: "Profil" },
  ];

  const {
    state: { currentUser, image, team, projects, loading },
    dispatch,
  } = useValue();

  const [showEditProfile, setShowEditProfile] = React.useState(false);
  const [showDeleteModal, setShowDeleteModal] = React.useState(false);
  const [id, setId] = React.useState([0]);
  const [imageUrl, setImageUrl] = React.useState("");

  const url = process.env.REACT_APP_backendURL + "/images/";

  useEffect(() => {
    startLoading(dispatch);
    if (currentUser !== null) {
      if (id[0] === 0) {
        setId(() => [{ _id: currentUser.id }]);
      }
      if (currentUser.image !== null && currentUser.image !== undefined) {
        getImageById(dispatch, currentUser?.image, currentUser);
      }
      if (currentUser.team !== null && currentUser.team !== undefined) {
        getTeamById(dispatch, currentUser?.team, currentUser);
      }
      if (team !== null && team !== undefined) {
        getProjectsByTeam(dispatch, currentUser);
      }
    }
  }, [currentUser]);

  useEffect(() => {
    if (currentUser !== null) {
      setImageUrl(image?.filePath);
      //wait 10 ms to show loading
      setTimeout(() => {
        endLoading(dispatch);
      }, 100);
    }
  }, [team, image, projects]);

  const user = [
    { name: "Vorname", value: currentUser?.firstName },
    { name: "Nachname", value: currentUser?.lastName },
    { name: "E-Mail", value: currentUser?.email },
    { name: "Jobbezeichnung", value: currentUser?.title },
    { name: "Standort", value: currentUser?.location },
    { name: "Rolle", value: currentUser?.role },
  ];

  return (
    <Layout
      inhalt={
        <>
          <BreadCrumbBar
            breadCrumbInfo={breadCrumbInfo}
            backButtonLink={"/dashboard"}
            editButton={setShowEditProfile}
            deleteButton={setShowDeleteModal}
            loading={loading}
          />
          <DeleteModal
            showDeleteModal={showDeleteModal}
            close={() => {
              setShowDeleteModal(false);
            }}
            submitdelete={() => {
              setShowDeleteModal(false);
              localStorage.clear();
              window.location.reload();
            }}
            id={id}
            dispatch={dispatch}
            type="user"
            message="Wollen Sie Ihren Account wirklich löschen? Diese Aktion kann nicht
            rückgängig gemacht werden!"
            currentUser={currentUser}
          />

          <Box
            sx={{
              mx: "5%",
              mb: 5,
              p: 2,
              width: "90%",
              alignItems: "center",
              justifyContent: "space-between",
              bgcolor: "background.secondary",
              color: "text.default",
              borderRadius: "10px",
            }}
          >
            {loading ? (
              <Skeleton variant="rectangular" width={"100%"} height={"600px"} />
            ) : (
              <>
                <Box
                  display="flex"
                  sx={{ alignItems: "center", justifyContent: "left", mb: 2 }}
                >
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{ fontWeight: "bold", pl: 2 }}
                  >
                    Profil
                  </Typography>
                </Box>
                <EditProfile
                  showEditProfile={showEditProfile}
                  close={() => setShowEditProfile(false)}
                  imageUrl={imageUrl}
                  setImageUrl={setImageUrl}
                  imageId={image?._id}
                />
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "stretch",
                    alignContent: "stretch",
                  }}
                >
                  <Paper
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: "10px",
                      width: "400px",
                      boxShadow: 3,
                      py: 3,
                    }}
                  >
                    <Avatar
                      sx={{ width: "200px", height: "200px" }}
                      src={image && imageUrl ? url + imageUrl : ""}
                    >
                      {(
                        currentUser?.firstName?.charAt(0) +
                        currentUser?.lastName?.charAt(0)
                      ).toString()}
                    </Avatar>
                  </Paper>
                  <Box
                    sx={{
                      mx: 3,
                      width: "100%",
                      textOverflow: "ellipsis",
                      overflow: "hidden",
                      boxShadow: 3,
                      borderRadius: "10px",
                    }}
                  >
                    <ProfileTable user={user} />
                  </Box>

                  <UserProjects projects={projects} />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignContent: "stretch",
                    justifyContent: "left",
                    mt: 3,
                  }}
                >
                  <TeamView sx={{ ml: 3 }} team={team} />
                </Box>
              </>
            )}
          </Box>
        </>
      }
    />
  );
}

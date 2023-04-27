import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import "../../App.css";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import CloseIcon from "@mui/icons-material/Close";
import { useValue } from "../../context/ContextProvider";
import { getUser, getUsers, updateProfile } from "../../actions/user";
import { createImg } from "../../actions/image";
import FormControl from "@mui/material/FormControl";
import AvatarUpload from "./AvatarUpload";
import useAuth from "../../hooks/useAuth";

export default function EditProfile(props) {
  const locations = ["Kein Standort", "Nürnberg", "Bamberg", "Kapstadt"];
  const titles = [
    "Keine Bezeichnung",
    "Software Developer",
    "UI/UX Designer",
    "Tester",
  ];

  const {
    state: { currentUser },
    dispatch,
  } = useValue();

  const { auth } = useAuth();

  const [location, setLocation] = React.useState();
  const [title, setTitle] = React.useState();
  const [newImage, setNewImage] = React.useState(null);

  useEffect(() => {
    if (currentUser !== null) {
      getUser(currentUser.id, dispatch, currentUser);
    }
  }, [currentUser]);

  useEffect(() => {
    if (currentUser !== null) {
      if (location === undefined || title === undefined) {
        setLocation(currentUser.location);
        setTitle(currentUser.title);
      }
    }
  });

  async function handleEditSubmit(e) {
    e.preventDefault();
    const form = e.target;

    // upload image
    let image = {};
    if (newImage !== null) {
      const data = new FormData();
      data.append("myfile", newImage);
      await createImg(dispatch, data, currentUser).then((result) => {
        image = result;
      });
    }

    const firstName = form.firstName.value;
    const lastName = form.lastName.value;
    const email = form.email.value;
    const password = form.password.value;
    if (password === "dummydummy" && Object.keys(image).length === 0) {
      const result = updateProfile(
        currentUser,
        currentUser.id,
        { lastName, firstName, email, location, title },
        dispatch
      );
      if (result) {
        handleClose();
      }
    } else if (password === "dummydummy" && Object.keys(image).length !== 0) {
      const result = updateProfile(
        currentUser,
        currentUser.id,
        { lastName, firstName, email, location, title, image },
        dispatch
      );
      if (result) {
        handleClose();
      }
    } else {
      const result = updateProfile(
        currentUser,
        currentUser.id,
        { lastName, firstName, email, location, title, password },
        dispatch
      );
      if (result) {
        handleClose();
      }
    }
  }

  const handleClose = () => {
    props.close();
    if (auth.admin) {
      getUsers(dispatch, currentUser);
    }
  };

  return (
    <Dialog open={props.showEditProfile} onClose={handleClose} fullWidth>
      <Container maxWidth="xl" sx={{ p: 1, color: "text.default" }}>
        <form onSubmit={(event) => handleEditSubmit(event)}>
          <Grid
            container
            alignItems="center"
            justifyContent="center"
            sx={{ py: 2 }}
          >
            <h2>Profil bearbeiten</h2>

            <IconButton onClick={handleClose} sx={{ ml: "auto" }}>
              <CloseIcon sx={{ color: "text.default" }} />
            </IconButton>
          </Grid>
          <Box display="flex" justifyContent="center" sx={{ mb: 5 }}>
            <AvatarUpload
              newImage={newImage}
              setNewImage={setNewImage}
              imageUrl={props.imageUrl}
              setImageUrl={props.setImageUrl}
              currentUser={currentUser}
              dispatch={dispatch}
              imageId={props.imageId}
            />
          </Box>
          <Box display="flex" sx={{ gap: 2 }}>
            <TextField
              required
              id="firstName"
              label="Vorname"
              name="firstName"
              variant="outlined"
              size="small"
              defaultValue={currentUser?.firstName}
              sx={{ width: "100%", pb: 3 }}
            />
            <TextField
              required
              id="lastName"
              label="Nachname"
              name="lastName"
              variant="outlined"
              defaultValue={currentUser?.lastName}
              size="small"
              sx={{ width: "100%", pb: 3 }}
            />
          </Box>

          <TextField
            required
            id="email"
            label="E-Mail"
            name="email"
            variant="outlined"
            defaultValue={currentUser?.email}
            type="email"
            size="small"
            sx={{ width: "100%", pb: 3 }}
          />
          <Box display="flex" sx={{ gap: 2 }}>
            <TextField
              required
              id="password"
              label="Passwort"
              type="password"
              name="password"
              defaultValue="dummydummy"
              variant="outlined"
              size="small"
              sx={{ width: "100%", pb: 3 }}
            />
            <TextField
              required
              id="passwordRepeat"
              label="Passwort wiederholen"
              name="passwordRepeat"
              defaultValue="dummydummy"
              type="password"
              variant="outlined"
              size="small"
              sx={{ width: "100%", pb: 3 }}
            />
          </Box>
          <Box display="flex" sx={{ gap: 2 }}>
            <FormControl sx={{ width: 300 }}>
              <InputLabel id="location-select-label">Standort</InputLabel>
              <Select
                labelId="location-select-label"
                id="location-select"
                value={location}
                label="Standort"
                onChange={(event) => {
                  setLocation(event.target.value);
                }}
              >
                {locations.map((location) => (
                  <MenuItem value={location} key={location}>
                    {location}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl sx={{ width: 300 }}>
              <InputLabel id="title-select-label">Berufsbezeichnung</InputLabel>
              <Select
                labelId="title-select-label"
                id="title-select"
                value={title}
                label="Berufsbezeichnung"
                onChange={(event) => {
                  setTitle(event.target.value);
                }}
              >
                {titles.map((titles) => (
                  <MenuItem value={titles} key={titles}>
                    {titles}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <DialogActions>
            <Box sx={{ m: 1 }}>
              <Button
                onClick={handleClose}
                variant="create-button-secondary"
                sx={{ mr: 1 }}
              >
                Schließen
              </Button>
              <Button variant="create-button" type="submit">
                Speichern
              </Button>
            </Box>
          </DialogActions>
        </form>
      </Container>
    </Dialog>
  );
}

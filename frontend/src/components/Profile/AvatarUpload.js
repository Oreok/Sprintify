import { Avatar, Button, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import UploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import React, { createRef, useState } from "react";
import { deleteImage } from "../../actions/image";

const url = process.env.REACT_APP_backendURL + "/images/";

const AvatarUpload = (props) => {
  const [imageObject, setImageObject] = React.useState(null);

  const inputFileRef = createRef(null);

  const cleanup = () => {
    URL.revokeObjectURL(props.newImage);
    inputFileRef.current.value = null;
  };

  const setImage = (newImage) => {
    if (props.newImage) {
      cleanup();
    }
    props.setNewImage(newImage);

  };

  const handleOnChange = (event) => {
    const newImage = event.target?.files?.[0];

    if (newImage) {
      setImageObject(URL.createObjectURL(newImage));
      setImage(newImage);
    }
  };

  /**
   *
   * @param {React.MouseEvent<HTMLButtonElement, MouseEvent>} event
   */
  const handleClick = async (event) => {
    if (props.newImage || props.imageUrl) {
      event.preventDefault();
      setImage(null);
      setImageObject(null);
      if (props.imageUrl) {
        const data = {
          user: props.currentUser,
          imageUrl: props.imageUrl,
        };
        props.setImageUrl("");
        await deleteImage(props.dispatch, props.imageId, props.currentUser, data);
      }
    }
  };

  return (
    <Box sx={{ textAlign: "center" }}>

      <Avatar
        sx={{ width: "120px", height: "120px", ml: "auto", mr: "auto", mb: 3 }}
        alt="Avatar"
        src={imageObject || url + props.imageUrl}
        imgProps={{
          style: {
            maxHeight: "100%",
            maxWidth: "100%",
            objectFit: "cover",
          },
        }}
      >
        {(props.currentUser?.firstName?.charAt(0) +
          props.currentUser?.lastName?.charAt(0)).toString()}
      </Avatar>
      <input
        ref={inputFileRef}
        accept="image/*"
        hidden
        id="avatar-image-upload"
        type="file"
        onChange={handleOnChange}
      />
      <label htmlFor="avatar-image-upload">
        <Button
          variant="create-button"
          color="primary"
          component="span"
          mb={2}
          onClick={handleClick}
        >
          {props.newImage || props.imageUrl ? <DeleteIcon sx={{ mr: 1 }} /> : <UploadIcon sx={{ mr: 1 }} />}
          {props.newImage || props.imageUrl ? "Löschen" : "Upload"}
        </Button>
      </label>
      <Typography
        variant="caption"
        display="block" gutterBottom
        sx={{ mt: 3 }}
      >
        Die besten Ergebnisse erzielen Sie, wenn Sie ein Bild mit mindestens 128 x 128 Pixeln im .jpg-Format verwenden.
      </Typography>
    </Box>
  );
};

export default AvatarUpload;
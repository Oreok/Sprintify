import * as React from "react";
import Card from "@mui/material/Card";
import Stack from '@mui/material/Stack';
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import EmailIcon from '@mui/icons-material/Email';
import IconButton from '@mui/material/IconButton';
import NoAccountsIcon from "@mui/icons-material/PersonOff";

export default function TeamView({ team }) {
  const URL = process.env.REACT_APP_backendURL + "/images/";

  if (team === null) {
    return (
      <React.Fragment key="team">
        <Card
          sx={{
            textAlign: "left",
            width: "100%",
            position: "relative",
            borderRadius: "10px",
            boxShadow: 3,
            color: "text.default",
          }}
        >
          <CardContent>
            <Typography sx={{ fontSize: 14, color: "text.default" }} gutterBottom>
              Dein Team
            </Typography>
            <Typography
              sx={{
                color: "text.default",
                textOverflow: "ellipsis",
                overflow: "hidden",
                whiteSpace: "nowrap",
                textAlign: "center",
              }}
              variant="h5"
              component="div"
            >
              Du bist aktuell in keinem Team!
            </Typography>
          </CardContent>
        </Card>
      </React.Fragment>
    )
  }

  return (
    <React.Fragment key={team._id.toString()}>
      <Card
        sx={{
          textAlign: "left",
          width: "100%",
          position: "relative",
          borderRadius: "10px",
          boxShadow: 3,
          color: "text.default",
        }}
      >
        <CardContent>
          <Typography sx={{ fontSize: 14, color: "text.default" }} gutterBottom>
            Dein Team
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
            {team.teamTitle}
          </Typography>
          {/* vorherige bgcolor: "#f5f5f5" */}
          <Stack direction="row"
            sx={{
              marginTop: 2,
              pt: 2,
              bgcolor: "background.secondary",
              overflow: "auto",
              borderRadius: "10px",
              justifyContent: "flex-start",
            }}
          >
            {team.members.map((user) => (
              <ListItem key={`item-${user._id.toString()}`} sx={{ justifyContent: "center", minWidth: "200px", }} >
                <ListItemAvatar>
                  <Avatar
                    sx={{ m: "auto", width: 56, height: 56, }}
                    alt="J"
                    src={user?.image ? URL + user?.image.filePath : ""}
                  >
                    {(user?.firstName?.charAt(0) + 
                    user?.lastName?.charAt(0)).toString()}
                  </Avatar>
                  <ListItemText sx={{ textAlign: 'center' }}
                    primary={`${user.firstName} ${user.lastName}`}
                    secondary={`${user.title}`}
                  />
                  <CardActions sx={{ justifyContent: "center", mt: -1 }}>
                    <IconButton
                      component="a" href={`mailto:${user.email}`}
                      variant="card-icon-button"
                      color="secondary"
                      aria-label="email">
                      <EmailIcon />
                    </IconButton>
                  </CardActions>
                </ListItemAvatar>
              </ListItem>
            ))}
          </Stack>
        </CardContent>
      </Card>
    </React.Fragment>
  );
}




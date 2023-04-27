import * as React from "react";
import { Avatar, Card, CardContent } from "@mui/material";
import { Box } from "@mui/system";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AvatarGroup from "@mui/material/AvatarGroup";

export default function TeamCard(props) {
  const [addButton, setAddButton] = React.useState(false);
  const url = process.env.REACT_APP_backendURL + "/images/";

  React.useEffect(() => {
    if (props.teams.includes(props.team)) {
      setAddButton(true);
    }
  }, []);

  const addTeam = (team) => {
    if (addButton === false) {
      props.setTeams([...props.teams, team]);
      setAddButton(true);
    } else {
      props.setTeams(
        props.teams.filter((obj) => {
          return obj._id !== team._id;
        })
      );
      setAddButton(false);
    }
  };

  return (
    <Card
      sx={{
        maxWidth: "200px",
        minWidth: "200px",
        boxShadow: 3,
        color: "text.default",
        borderRadius: "5%",
      }}
    >
      <CardContent sx={{}}>
        <Box>
          <Typography sx={{ fontSize: 14, color: "text.default" }} gutterBottom>
            Team
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
            {props.team.teamTitle}
          </Typography>
          <AvatarGroup max={4} sx={{ my: 3, justifyContent: "center" }}>
            {props.team.members.map((user) => (
              <Avatar
                src={user?.image ? url + user?.image.filePath : ""}
                key={user._id}
              >
                {(user?.firstName?.charAt(0) +
                user?.lastName?.charAt(0)).toString()}
              </Avatar>
            ))}
          </AvatarGroup>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              sx={{ width: 100 }}
              variant={addButton === false ? "create-button" : "delete-button"}
              onClick={() => addTeam(props.team)}
            >
              {addButton === false ? "Hinzufügen" : "Entfernen"}
            </Button>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

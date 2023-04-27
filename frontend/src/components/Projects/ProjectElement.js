import * as React from "react";
import { Card, CardContent, Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function ProjectElement(props) {
  const Navigate = useNavigate();

  return (
    <>
      <Card
        sx={{
          minWidth: 320,
          maxWidth: 320,
          boxShadow: 3,
          color: "text.default",
          textAlign: "left",
          borderRadius: "5%",
        }}
      >
        <CardContent sx={{ m: 1 }}>
          <Box
            sx={{
              height: "190px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Typography sx={{ fontSize: 14, color: "text.default" }} gutterBottom>
              Projekt
            </Typography>
            <Typography
              align="left"
              variant="h5"
              component="div"
              sx={{
                display: "-webkit-box",
                overflow: "hidden",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 2,
                pb: 1,
              }}
            >
              {props.project.projectName}
            </Typography>
            <Typography
              align="left"
              variant="subtitle2"
              gutterBottom
              sx={{
                minHeight: "40px",
                maxHeight: "40px",
                display: "-webkit-box",
                overflow: "hidden",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 2,
              }}
            >
              {props.project.projectDescription}
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
                mt: 2,
              }}
            >
              <Button
                variant="card-button"
                onClick={() => {
                  Navigate(`/project/${props.project._id}`);
                }}
              >
                Öffnen
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </>
  );
}

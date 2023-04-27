import React from "react";
import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";

export default function DashboardCard(props) {
  return (
    <Grid xs={props.testprop.size}>
      <Box
        sx={{
          border: 2.5,
          borderColor: "#4C96BA",
          borderRadius: 2,
          background: props.testprop.backgroundColor,
          color: props.testprop.color
        }}
      >
        <Box sx={{display: "flex", alignItems:"flex-start", flexDirection: "column", px:3, pt:1.5}}>
          <p>{props.testprop.title}</p>
          <p>{props.testprop.SubTitle}</p>
        </Box>
        <Box sx={{display: "flex", justifyContent: "center", alignItems: "center", p:4}}>
          <h3>{props.testprop.value}</h3>
        </Box>
      </Box>
    </Grid>
  );
}

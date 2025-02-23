import React from "react";
import NavBar from "./NavBar";
import SideNav from "./SideNav";
import { Box, Grid, Typography } from "@mui/material";
const AppTemplate = ({ content }) => {
  return (
    <>
      <NavBar></NavBar>
      <br></br>
      <br></br>
      <Box sx={{ display: "flex" }}>
        <SideNav></SideNav>
        <Grid container>
          <Grid item xs={12}>
            <Box sx={{ p: 3, mt: 1 }}>
              <Typography variant="h3" fontWeight="bold">
                GENERATE INPUT GROUND MOTIONS FOR NUMERICAL ANALYSES
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  borderBottom: 2,
                  padding: 2,
                  borderColor: "black",
                }}
              >
                A web application for the development of input ground motions
                for the numerical evaluation of structures in engineering
                practice
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ p: 1, alignItems: "center" }}>{content}</Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default AppTemplate;

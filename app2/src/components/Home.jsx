import React from "react";
import SideNav from "./SideNav";
import Box from "@mui/material/Box";

const Home = () => {
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <SideNav></SideNav>
      </Box>
    </>
  );
};

export default Home;

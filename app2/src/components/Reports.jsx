import Box from "@mui/material/Box";
import React from "react";
import SideNav from "./SideNav";

const Reports = () => {
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <SideNav></SideNav>
        <h1>Reports</h1>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}></Box>
      </Box>
    </>
  );
};

export default Reports;

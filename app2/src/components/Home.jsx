import React from "react";
import { Box } from "@mui/material";
import AppTemplate from "./AppTemplate";
const Test = () => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          backgroundColor: "black",
          flexDirection: "row",
          flexWrap: "wrap",

          justifyContent: "center",
          alignContent: "center",
          alignItems: "flex-end",
        }}
      >
        <Box
          padding={4}
          margin={2}
          sx={{ backgroundColor: "green", height: "60px" }}
        >
          1
        </Box>
        <Box
          padding={4}
          margin={2}
          sx={{ backgroundColor: "green", height: "80px" }}
        >
          2
        </Box>
        <Box
          padding={4}
          margin={2}
          sx={{ backgroundColor: "green", height: "100px" }}
        >
          3
        </Box>
        <Box padding={4} margin={2} sx={{ backgroundColor: "green" }}>
          4
        </Box>
        <Box padding={4} margin={2} sx={{ backgroundColor: "green" }}>
          5
        </Box>
        <Box padding={4} margin={2} sx={{ backgroundColor: "green" }}>
          6
        </Box>
        <Box padding={4} margin={2} sx={{ backgroundColor: "green" }}>
          7
        </Box>
        <Box padding={4} margin={2} sx={{ backgroundColor: "green" }}>
          8
        </Box>
        <Box padding={4} margin={2} sx={{ backgroundColor: "green" }}>
          9
        </Box>
        <Box padding={4} margin={2} sx={{ backgroundColor: "green" }}>
          10
        </Box>
        <Box padding={4} margin={2} sx={{ backgroundColor: "green" }}>
          11
        </Box>
        <Box padding={4} margin={2} sx={{ backgroundColor: "green" }}>
          12
        </Box>
        <Box
          padding={4}
          margin={2}
          sx={{ backgroundColor: "green", height: "80px" }}
        >
          13
        </Box>
      </Box>
    </>
  );
};
const Home = () => {
  return (
    <>
      <AppTemplate content={<Test></Test>}></AppTemplate>
    </>
  );
};

export default Home;

import React from "react";
import { Button, Stack, Box } from "@mui/material";
import { Link } from "react-router-dom";
import AppTemplate from "./AppTemplate";
const Help = () => {
  return (
    <Box sx={{ textAlign: "center", mt: 3 }}>
      <Stack direction="row" spacing={2} justifyContent="center">
        <Button
          component={Link}
          to="/login"
          variant="contained"
          color="primary"
        >
          Login
        </Button>
        <Button
          component={Link}
          to="/signup"
          variant="outlined"
          color="primary"
        >
          Signup
        </Button>
      </Stack>
    </Box>
  );
};
const Home = () => {
  return (
    <>
      <AppTemplate content={<Help></Help>} />
    </>
  );
};

export default Home;

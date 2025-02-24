import React, { useState } from "react";
import { TextField, Typography, Box, Container, Button } from "@mui/material";
import { setUser } from "../../state/UserReducer";
import { useDispatch } from "react-redux";

import { Link } from "react-router-dom";
const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://127.0.0.1:5000/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        const { user } = data;
        onLogin();

        dispatch(
          setUser({
            username: user.username,
            email: user.email,
          })
        );
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Login failed");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <Container
      maxWidth="xs"
      sx={{
        display: "flex",

        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 400,
          textAlign: "center",
        }}
      >
        <Box component="form" onSubmit={handleSubmit}>
          <Typography variant="h4" align="center" gutterBottom>
            Login
          </Typography>
          <TextField
            fullWidth
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
            required
          />
          {error && (
            <Typography color="error" align="center">
              {error}
            </Typography>
          )}
          <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
            Login
          </Button>
          <Button sx={{ mt: 1 }} component={Link} to="/signup" color="primary">
            Create Account
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;

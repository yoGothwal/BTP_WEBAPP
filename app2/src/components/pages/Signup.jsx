import React, { useState } from "react";
import { Button, TextField, Typography, Box, Container } from "@mui/material";
import { Link } from "react-router-dom";
const Signup = ({ onSignup }) => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://127.0.0.1:5000/user/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, username, email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        onSignup(); // Notify parent component of successful signup
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Signup failed");
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
            Signup
          </Typography>
          <TextField
            fullWidth
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            margin="normal"
            required
          />
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
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            Signup
          </Button>
          <Button sx={{ mt: 1 }} component={Link} to="/login" color="primary">
            Login
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Signup;

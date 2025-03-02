import React, { useState, useEffect } from "react";
import Application from "./components/0_Application.jsx";
import "./App.css";
import Reports from "./components/Reports.jsx";
import About from "./components/About";
import Home from "./components/Home";
import Login from "./components/pages/Login.jsx";
import Signup from "./components/pages/Signup.jsx";
import {
  Routes,
  Route,
  BrowserRouter as Router,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";

const App = () => {
  const user = useSelector((state) => state.user.user);
  console.log("user", user);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  useEffect(() => {
    fetch("/api")
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleLogin = () => {
    console.log(isLoggedIn);
    setIsLoggedIn(true);
  };

  return (
    <div className="container-fluid">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route
            path="/login"
            element={
              isLoggedIn ? (
                <Navigate to="/generate" />
              ) : (
                <Login onLogin={handleLogin} />
              )
            }
          />
          <Route
            path="/signup"
            element={
              isLoggedIn ? (
                <Navigate to="/generate" />
              ) : (
                <Signup onSignup={handleLogin} />
              )
            }
          />
          <Route
            path="/generate"
            element={
              isLoggedIn ? (
                <Application />
              ) : (
                <Navigate
                  to="/login"
                  state={{ from: location.pathname }}
                  replace
                />
              )
            }
          />
          <Route
            path="/reports"
            element={
              isLoggedIn ? (
                <Reports />
              ) : (
                <Navigate
                  to="/login"
                  state={{ from: location.pathname }}
                  replace
                />
              )
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;

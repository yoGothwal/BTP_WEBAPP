import React, { useState, useEffect } from "react";
import Application from "./components/0_Application.jsx";
import "./App.css";
import Reports from "./components/Reports.jsx";

import About from "./components/About";
import Home from "./components/Home";

import { Routes, Route, BrowserRouter as Router } from "react-router-dom";

const App = () => {
  useEffect(() => {
    fetch("/api")
      .then((response) => {
        if (response.status == 200) {
          return response.json();
        }
      })
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="container-fluid">
      <Router>
        <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          <Route path="/about" element={<About></About>}></Route>
          <Route path="/generate" element={<Application></Application>}></Route>
          <Route path="/reports" element={<Reports></Reports>}></Route>
        </Routes>
      </Router>
    </div>
  );
};

export default App;

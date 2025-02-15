import React, { useState, useEffect } from "react";
import Application from "./components/0_Application";
import "./App.css";
import Illustration from "./App.png";

import SideNav from "./components/SideNav";
import About from "./components/About"
import Home from "./components/Home"

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
      <h2> GENERATE INPUT GROUND MOTIONS FOR NUMERICAL ANALYSES </h2>
      A web application for the development of input ground motions for the
      numerical evaluation of structures in engineering practice <hr />
      <Router>
        <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          <Route path="/about" element={<About></About>}></Route>
          <Route path="/analyze" element={<Application></Application>}></Route>
        </Routes>
      </Router>
      <SideNav></SideNav>
      <div style={{ margin: 20 }}>
        <br></br>
        <br></br>
        <img src={Illustration} alt="Illustration" width="100%"></img>
      </div>
    </div>
  );
}

export default App;

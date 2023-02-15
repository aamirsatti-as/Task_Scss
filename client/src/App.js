import React, { createContext, useState } from "react";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Add from "./pages/add/add";
import Login from "./pages/login/login";
import View from "./pages/view/view";
function App() {
  var userExist = localStorage.getItem("profile");

  //Non Authentic User will only authorize to use login route
  if (!userExist) {
    return (
      <Routes>
        <Route exact path="*" element={<Login />} />
      </Routes>
    );
  }
  //Authentic User  authorize to use all route
  if (userExist) {
    return (
      <div>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route path="/add" element={<Add />} />
          <Route path="/View" element={<View />} />
        </Routes>
      </div>
    );
  }
}

export default App;

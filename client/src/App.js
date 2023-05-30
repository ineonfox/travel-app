import React from "react";
//import logo from "./logo.svg";
import "./App.css";

import MainPage from "./components/MainPage";
import { Routes, Route } from 'react-router-dom';
import Plan from "./components/Plan";
import StepPage from "./components/steps/StepPage";
// import LoginPage from "./components/LoginPage";

function App() {
  return(
    <div>
      <Routes>
        <Route path="/" element={<MainPage/>} />
        <Route path="plan" element={<Plan />} />
        <Route path="steps" element={<StepPage />} />
        {/* <Route path="login" element={<LoginPage />} /> */}
      </Routes>
    </div>
  );
}

export default App;
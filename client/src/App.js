import React from "react";
//import logo from "./logo.svg";
import "./App.css";

import MainPage from "./components/MainPage";
import { Routes, Route } from 'react-router-dom';
import Plan from "./components/Plan";
import StepPage from "./components/steps/StepPage";

function App() {
  return(
    <div>
      <Routes>
        <Route path="/" element={<MainPage/>} />
        <Route path="plan" element={<Plan />} />
        <Route path="steps" element={<StepPage />} />
      </Routes>
    </div>
  );
}

export default App;
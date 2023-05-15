import React from "react";
//import logo from "./logo.svg";
import "./App.css";

import MainPage from "./components/MainPage";
import { Routes, Route } from 'react-router-dom';
import Plan from "./components/Plan";

function App() {
  return(
    <div>
      <Routes>
        <Route path="/" element={<MainPage/>} />
        <Route path="plan" element={<Plan />} />
      </Routes>
    </div>
  );
}

export default App;
import React, { useState } from "react";
//import logo from "./logo.svg";
import "./App.css";

import MainPage from "./components/MainPage";
import { Routes, Route } from 'react-router-dom';
import Plan from "./components/Plan";
import StepPage from "./components/steps/StepPage";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import AdminPanel from "./components/AdminPanel";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  return(
    <div>
      <Routes>
        <Route path="/" element={<MainPage isLoggedIn={isLoggedIn} isAdmin={isAdmin}/>} />
        <Route path="plan" element={<Plan />} />
        <Route path="steps" element={<StepPage />} />
        <Route path="login" element={<LoginPage setIsLoggedIn={setIsLoggedIn} setIsAdmin={setIsAdmin}/>} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="admin" element={<AdminPanel />} />
      </Routes>
    </div>
  );
}

export default App;
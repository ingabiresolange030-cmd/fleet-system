import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";

import Login from "./components/Login";
import Register from "./components/Register";

import Dashboard from "./components/Dashboard";
import Driver from "./components/Driver";
import Vehicle from "./components/Vehicle";
import Trip from "./components/Trip";
import Report from "./components/Report";

function App() {
  return (
    <Router>

      <Routes>

        {/* LOGIN OUTSIDE LAYOUT */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* PAGES INSIDE LAYOUT */}
        <Route element={<Layout />}>

          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/drivers" element={<Driver />} />
          <Route path="/vehicles" element={<Vehicle />} />
          <Route path="/trips" element={<Trip />} />
          <Route path="/reports" element={<Report />} />

        </Route>

      </Routes>

    </Router>
  );
}

export default App;
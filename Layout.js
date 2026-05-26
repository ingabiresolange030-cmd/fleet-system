import React from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="flex">

      {/* LEFT SIDE NAVBAR (fixed layout idea) */}
      <Navbar />

      {/* MAIN CONTENT */}
      <div className="flex-1 ml-60 bg-gray-100 min-h-screen">
        <Outlet />
      </div>

    </div>
  );
}

export default Layout;
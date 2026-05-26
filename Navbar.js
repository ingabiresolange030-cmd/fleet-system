import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (

    <div className="w-60 h-screen bg-blue-700 text-white fixed p-4">

      <h1 className="text-xl font-bold mb-6 text-center">
        FMS System
      </h1>

      <div className="flex flex-col gap-3">

        <Link className="hover:bg-blue-800 p-2 rounded" to="/dashboard">
          Dashboard
        </Link>

        <Link className="hover:bg-blue-800 p-2 rounded" to="/drivers">
          Drivers
        </Link>

        <Link className="hover:bg-blue-800 p-2 rounded" to="/vehicles">
          Vehicles
        </Link>

        <Link className="hover:bg-blue-800 p-2 rounded" to="/trips">
          Trips
        </Link>

        <Link className="hover:bg-blue-800 p-2 rounded" to="/reports">
          Reports
        </Link>

        <Link className="hover:bg-red-600 p-2 rounded mt-6" to="/">
          Logout
        </Link>

      </div>

    </div>
  );
}

export default Navbar;
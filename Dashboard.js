
import React, { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {

  const [drivers, setDrivers] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/drivers").then(res => setDrivers(res.data));
    axios.get("http://localhost:5000/vehicles").then(res => setVehicles(res.data));
    axios.get("http://localhost:5000/trips").then(res => setTrips(res.data));
  }, []);

  return (
  

    <div className="bg-gray-100 min-h-screen flex items-center justify-center p-4">

      <div className="w-full max-w-3xl">

        {/* TITLE */}
        <h1 className="text-2xl font-bold text-blue-700 text-center mb-6">
          Fleet Dashboard
        </h1>

        {/* CENTERED CARDS */}
        <div className="grid grid-cols-3 gap-3 mb-6 text-center">

          <div className="bg-white p-4 rounded shadow flex flex-col items-center justify-center">
            <p className="text-sm text-gray-600">Drivers</p>
            <p className="text-2xl font-bold text-blue-600">{drivers.length}</p>
          </div>

          <div className="bg-white p-4 rounded shadow flex flex-col items-center justify-center">
            <p className="text-sm text-gray-600">Vehicles</p>
            <p className="text-2xl font-bold text-green-600">{vehicles.length}</p>
          </div>

          <div className="bg-white p-4 rounded shadow flex flex-col items-center justify-center">
            <p className="text-sm text-gray-600">Trips</p>
            <p className="text-2xl font-bold text-purple-600">{trips.length}</p>
          </div>

        </div>

        {/* MENU CARDS */}
        <div className="grid grid-cols-2 gap-3 text-center">

          <div className="bg-white p-3 rounded shadow">
            Drivers
          </div>

          <div className="bg-white p-3 rounded shadow">
            Vehicles
          </div>

          <div className="bg-white p-3 rounded shadow">
            Trips
          </div>

          <div className="bg-white p-3 rounded shadow">
            Reports
          </div>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;
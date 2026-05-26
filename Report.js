import React, { useEffect, useState } from "react";
import axios from "axios";

function Reports() {

  const [trips, setTrips] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [drivers, setDrivers] = useState([]);

  // =========================
  // FETCH DATA
  // =========================
  const fetchTrips = async () => {
    const res = await axios.get("http://localhost:5000/reports");
    setTrips(res.data);
  };

  const fetchVehicles = async () => {
    const res = await axios.get("http://localhost:5000/vehicles");
    setVehicles(res.data);
  };

  const fetchDrivers = async () => {
    const res = await axios.get("http://localhost:5000/drivers");
    setDrivers(res.data);
  };

  useEffect(() => {
    fetchTrips();
    fetchVehicles();
    fetchDrivers();
  }, []);

  // =========================
  // SYSTEM STATISTICS
  // =========================
  const totalTrips = trips.length;
  const totalDrivers = drivers.length;
  const totalVehicles = vehicles.length;

  const totalFuel = trips.reduce((sum, t) => {
    return sum + (parseFloat(t.FuelUsed) || 0);
  }, 0);

  const completedTrips = trips.filter(t => t.TripStatus === "Completed").length;

  return (

    <div className="ml-60 p-6 bg-gray-100 min-h-screen">

      {/* TITLE */}
      <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">
        Fleet System Reports & Statistics
      </h1>

      {/* =========================
          STATISTICS CARDS
      ========================= */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">

        <div className="bg-white p-4 rounded shadow border-l-4 border-blue-600">
          <h3 className="font-bold">Trips</h3>
          <p className="text-2xl text-blue-600">{totalTrips}</p>
        </div>

        <div className="bg-white p-4 rounded shadow border-l-4 border-green-600">
          <h3 className="font-bold">Drivers</h3>
          <p className="text-2xl text-green-600">{totalDrivers}</p>
        </div>

        <div className="bg-white p-4 rounded shadow border-l-4 border-purple-600">
          <h3 className="font-bold">Vehicles</h3>
          <p className="text-2xl text-purple-600">{totalVehicles}</p>
        </div>

        <div className="bg-white p-4 rounded shadow border-l-4 border-yellow-600">
          <h3 className="font-bold">Fuel Used</h3>
          <p className="text-2xl text-yellow-600">{totalFuel} L</p>
        </div>

        <div className="bg-white p-4 rounded shadow border-l-4 border-red-600">
          <h3 className="font-bold">Completed Trips</h3>
          <p className="text-2xl text-red-600">{completedTrips}</p>
        </div>

      </div>

      {/* ===================== TRIP REPORT ===================== */}
      <div className="bg-white p-4 rounded shadow mb-6">

        <h2 className="text-xl font-bold mb-3">
          Trip History Report
        </h2>

        <table className="w-full border">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-2">Driver</th>
              <th className="p-2">Vehicle</th>
              <th className="p-2">From</th>
              <th className="p-2">To</th>
              <th className="p-2">Departure</th>
              <th className="p-2">Return</th>
              <th className="p-2">Fuel</th>
              <th className="p-2">Status</th>
            </tr>
          </thead>

          <tbody>
            {trips.map((t) => (
              <tr key={t.TripID} className="text-center border-b">
                <td className="p-2">
                  {t.FirstName} {t.LastName}
                </td>
                <td className="p-2">{t.PlateNumber}</td>
                <td className="p-2">{t.DepartureLocation}</td>
                <td className="p-2">{t.Destination}</td>
                <td className="p-2">{t.DepartureDate}</td>
                <td className="p-2">{t.ReturnDate}</td>
                <td className="p-2">{t.FuelUsed}</td>
                <td className="p-2">{t.TripStatus}</td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>

      {/* ===================== VEHICLE REPORT ===================== */}
      <div className="bg-white p-4 rounded shadow mb-6">

        <h2 className="text-xl font-bold mb-3">
          Vehicle Status Report
        </h2>

        <table className="w-full border">
          <thead className="bg-green-600 text-white">
            <tr>
              <th className="p-2">Code</th>
              <th className="p-2">Plate</th>
              <th className="p-2">Type</th>
              <th className="p-2">Brand</th>
              <th className="p-2">Capacity</th>
              <th className="p-2">Status</th>
            </tr>
          </thead>

          <tbody>
            {vehicles.map((v) => (
              <tr key={v.VehicleCode} className="text-center border-b">
                <td className="p-2">{v.VehicleCode}</td>
                <td className="p-2">{v.PlateNumber}</td>
                <td className="p-2">{v.VehicleType}</td>
                <td className="p-2">{v.Brand}</td>
                <td className="p-2">{v.Capacity}</td>
                <td className="p-2">{v.Status}</td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>

      {/* ===================== DRIVER REPORT ===================== */}
      <div className="bg-white p-4 rounded shadow">

        <h2 className="text-xl font-bold mb-3">
          Drivers List Report
        </h2>

        <table className="w-full border">
          <thead className="bg-purple-600 text-white">
            <tr>
              <th className="p-2">ID</th>
              <th className="p-2">First Name</th>
              <th className="p-2">Last Name</th>
              <th className="p-2">Phone</th>
              <th className="p-2">License</th>
              <th className="p-2">Address</th>
            </tr>
          </thead>

          <tbody>
            {drivers.map((d) => (
              <tr key={d.DriverID} className="text-center border-b">
                <td className="p-2">{d.DriverID}</td>
                <td className="p-2">{d.FirstName}</td>
                <td className="p-2">{d.LastName}</td>
                <td className="p-2">{d.Telephone}</td>
                <td className="p-2">{d.LicenseNumber}</td>
                <td className="p-2">{d.Address}</td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>

    </div>
  );
}

export default Reports;
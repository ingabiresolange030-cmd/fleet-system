import React, { useState, useEffect } from "react";
import axios from "axios";

function Trip() {

  const [trips, setTrips] = useState([]);
  const [editId, setEditId] = useState(null);

  const [formData, setFormData] = useState({
    DriverID: "",
    VehicleCode: "",
    DepartureLocation: "",
    Destination: "",
    DepartureDate: "",
    ReturnDate: "",
    FuelUsed: "",
    TripStatus: ""
  });

  // =========================
  // FETCH TRIPS
  // =========================
  const fetchTrips = async () => {
    try {
      const res = await axios.get("http://localhost:5000/trips");
      setTrips(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTrips();
  }, []);

  // =========================
  // HANDLE INPUT
  // =========================
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // =========================
  // CREATE + UPDATE TRIP
  // =========================
  const saveTrip = async (e) => {
    e.preventDefault();

    try {

      if (editId) {
        await axios.put(`http://localhost:5000/trips/${editId}`, formData);
        alert("Trip Updated Successfully");
      } else {
        await axios.post("http://localhost:5000/trips", formData);
        alert("Trip Saved Successfully");
      }

      setFormData({
        DriverID: "",
        VehicleCode: "",
        DepartureLocation: "",
        Destination: "",
        DepartureDate: "",
        ReturnDate: "",
        FuelUsed: "",
        TripStatus: ""
      });

      setEditId(null);
      fetchTrips();

    } catch (error) {
      console.log(error);
    }
  };

  // =========================
  // EDIT TRIP
  // =========================
  const editTrip = (trip) => {
    setFormData({
      DriverID: trip.DriverID,
      VehicleCode: trip.VehicleCode,
      DepartureLocation: trip.DepartureLocation,
      Destination: trip.Destination,
      DepartureDate: trip.DepartureDate,
      ReturnDate: trip.ReturnDate,
      FuelUsed: trip.FuelUsed,
      TripStatus: trip.TripStatus
    });

    setEditId(trip.TripID);
  };

  // =========================
  // DELETE TRIP
  // =========================
  const deleteTrip = async (id) => {
    if (window.confirm("Delete this trip?")) {
      try {
        await axios.delete(`http://localhost:5000/trips/${id}`);
        fetchTrips();
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (

    <div className="ml-60 p-6 bg-gray-100 min-h-screen">

      {/* TITLE */}
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">
        Trip Management
      </h1>

      {/* FORM */}
      <div className="bg-white p-6 rounded shadow-md mb-8">

        <form onSubmit={saveTrip}>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <input
              name="DriverID"
              value={formData.DriverID}
              onChange={handleChange}
              placeholder="Driver ID"
              className="border p-2 rounded"
            />

            <input
              name="VehicleCode"
              value={formData.VehicleCode}
              onChange={handleChange}
              placeholder="Vehicle Code"
              className="border p-2 rounded"
            />

            <input
              name="DepartureLocation"
              value={formData.DepartureLocation}
              onChange={handleChange}
              placeholder="Departure"
              className="border p-2 rounded"
            />

            <input
              name="Destination"
              value={formData.Destination}
              onChange={handleChange}
              placeholder="Destination"
              className="border p-2 rounded"
            />

            <input
              type="date"
              name="DepartureDate"
              value={formData.DepartureDate}
              onChange={handleChange}
              className="border p-2 rounded"
            />

            <input
              type="date"
              name="ReturnDate"
              value={formData.ReturnDate}
              onChange={handleChange}
              className="border p-2 rounded"
            />

            <input
              type="number"
              name="FuelUsed"
              value={formData.FuelUsed}
              onChange={handleChange}
              placeholder="Fuel Used"
              className="border p-2 rounded"
            />

            <select
              name="TripStatus"
              value={formData.TripStatus}
              onChange={handleChange}
              className="border p-2 rounded"
            >
              <option value="">Select Status</option>
              <option>Pending</option>
              <option>In Progress</option>
              <option>Completed</option>
            </select>

          </div>

          <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded">
            {editId ? "Update Trip" : "Save Trip"}
          </button>

        </form>

      </div>

      {/* TABLE */}
      <div className="bg-white p-6 rounded shadow">

        <table className="w-full border">

          <thead className="bg-blue-600 text-white">

            <tr>
              <th className="p-2">ID</th>
              <th className="p-2">Driver</th>
              <th className="p-2">Vehicle</th>
              <th className="p-2">From</th>
              <th className="p-2">To</th>
              <th className="p-2">Fuel</th>
              <th className="p-2">Status</th>
              <th className="p-2">Actions</th>
            </tr>

          </thead>

          <tbody>

            {trips.map((t) => (

              <tr key={t.TripID} className="text-center border-b">

                <td className="p-2">{t.TripID}</td>
                <td className="p-2">{t.DriverID}</td>
                <td className="p-2">{t.VehicleCode}</td>
                <td className="p-2">{t.DepartureLocation}</td>
                <td className="p-2">{t.Destination}</td>
                <td className="p-2">{t.FuelUsed}</td>
                <td className="p-2">{t.TripStatus}</td>

                <td className="p-2">

                  <button
                    onClick={() => editTrip(t)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteTrip(t.TripID)}
                    className="bg-red-600 text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default Trip;
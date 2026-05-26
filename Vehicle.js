import React, { useState, useEffect } from "react";
import axios from "axios";

function Vehicle() {

  const [vehicles, setVehicles] = useState([]);
  const [editId, setEditId] = useState(null);

  const [formData, setFormData] = useState({
    VehicleCode: "",
    PlateNumber: "",
    VehicleType: "",
    Brand: "",
    Capacity: "",
    Status: "",
    PurchaseDate: ""
  });

  // FETCH
  const fetchVehicles = async () => {
    const res = await axios.get("http://localhost:5000/vehicles");
    setVehicles(res.data);
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  // INPUT
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // SAVE / UPDATE
  const saveVehicle = async (e) => {
    e.preventDefault();

    if (editId) {
      await axios.put(`http://localhost:5000/vehicles/${editId}`, formData);
      alert("Updated Successfully");
    } else {
      await axios.post("http://localhost:5000/vehicles", formData);
      alert("Saved Successfully");
    }

    setFormData({
      VehicleCode: "",
      PlateNumber: "",
      VehicleType: "",
      Brand: "",
      Capacity: "",
      Status: "",
      PurchaseDate: ""
    });

    setEditId(null);
    fetchVehicles();
  };

  // EDIT
  const editVehicle = (v) => {
    setFormData(v);
    setEditId(v.VehicleCode);
  };

  // DELETE
  const deleteVehicle = async (id) => {
    if (window.confirm("Delete this vehicle?")) {
      await axios.delete(`http://localhost:5000/vehicles/${id}`);
      fetchVehicles();
    }
  };

  return (

    <div className="ml-60 bg-gray-100 min-h-screen p-4">

      <div className="container mx-auto max-w-5xl">

        {/* TITLE */}
        <h1 className="text-2xl font-bold text-center text-blue-700 mb-4">
          Vehicle Management
        </h1>

        {/* FORM */}
        <div className="bg-white p-4 rounded shadow mb-5">

          <form onSubmit={saveVehicle}>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

              <input className="border p-2 rounded text-sm"
                name="VehicleCode"
                value={formData.VehicleCode}
                onChange={handleChange}
                placeholder="Vehicle Code"
              />

              <input className="border p-2 rounded text-sm"
                name="PlateNumber"
                value={formData.PlateNumber}
                onChange={handleChange}
                placeholder="Plate Number"
              />

              <input className="border p-2 rounded text-sm"
                name="VehicleType"
                value={formData.VehicleType}
                onChange={handleChange}
                placeholder="Type"
              />

              <input className="border p-2 rounded text-sm"
                name="Brand"
                value={formData.Brand}
                onChange={handleChange}
                placeholder="Brand"
              />

              <input className="border p-2 rounded text-sm"
                name="Capacity"
                value={formData.Capacity}
                onChange={handleChange}
                placeholder="Capacity"
              />

              <select className="border p-2 rounded text-sm"
                name="Status"
                value={formData.Status}
                onChange={handleChange}
              >
                <option value="">Status</option>
                <option>Available</option>
                <option>Busy</option>
                <option>Maintenance</option>
              </select>

              <input className="border p-2 rounded text-sm"
                type="date"
                name="PurchaseDate"
                value={formData.PurchaseDate}
                onChange={handleChange}
              />

            </div>

            <button className="mt-3 bg-blue-600 text-white px-4 py-2 rounded text-sm">
              {editId ? "Update" : "Save"}
            </button>

          </form>

        </div>

        {/* TABLE */}
        <div className="bg-white p-3 rounded shadow overflow-x-auto">

          <table className="w-full text-sm">

            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="p-2">Code</th>
                <th className="p-2">Plate</th>
                <th className="p-2">Type</th>
                <th className="p-2">Brand</th>
                <th className="p-2">Capacity</th>
                <th className="p-2">Status</th>
                <th className="p-2">Date</th>
                <th className="p-2">Actions</th>
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
                  <td className="p-2">{v.PurchaseDate}</td>

                  <td className="p-2">

                    <button
                      onClick={() => editVehicle(v)}
                      className="bg-yellow-500 text-white px-2 py-1 rounded text-xs mr-1"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => deleteVehicle(v.VehicleCode)}
                      className="bg-red-600 text-white px-2 py-1 rounded text-xs"
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

    </div>
  );
}

export default Vehicle;
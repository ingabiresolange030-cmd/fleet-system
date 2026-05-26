import React, { useState, useEffect } from "react";
import axios from "axios";

function Driver() {
  const [drivers, setDrivers] = useState([]);
  const [editId, setEditId] = useState(null);

  const [formData, setFormData] = useState({
    FirstName: "",
    LastName: "",
    Gender: "",
    Telephone: "",
    LicenseNumber: "",
    Address: "",
    HireDate: ""
  });

  const fetchDrivers = async () => {
    const res = await axios.get("http://localhost:5000/drivers");
    setDrivers(res.data);
  };

  useEffect(() => {
    fetchDrivers();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const saveDriver = async (e) => {
    e.preventDefault();

    if (editId) {
      await axios.put(`http://localhost:5000/drivers/${editId}`, formData);
      alert("Updated");
    } else {
      await axios.post("http://localhost:5000/drivers", formData);
      alert("Saved");
    }

    setFormData({
      FirstName: "",
      LastName: "",
      Gender: "",
      Telephone: "",
      LicenseNumber: "",
      Address: "",
      HireDate: ""
    });

    setEditId(null);
    fetchDrivers();
  };

  const editDriver = (d) => {
    setFormData(d);
    setEditId(d.DriverID);
  };

  const deleteDriver = async (id) => {
    await axios.delete(`http://localhost:5000/drivers/${id}`);
    fetchDrivers();
  };

  return (
    <div className="ml-60 p-4 bg-gray-100 min-h-screen">

      {/* FORM CARD */}
      <div className="bg-white p-4 rounded shadow mb-6 max-w-3xl mx-auto">

        <h1 className="text-xl font-bold mb-3 text-center text-blue-700">
          Driver Management
        </h1>

        <form onSubmit={saveDriver} className="grid grid-cols-2 gap-3 text-sm">

          <input name="FirstName" value={formData.FirstName} onChange={handleChange} placeholder="First Name" className="border p-2 rounded" />
          <input name="LastName" value={formData.LastName} onChange={handleChange} placeholder="Last Name" className="border p-2 rounded" />

          <select name="Gender" value={formData.Gender} onChange={handleChange} className="border p-2 rounded">
            <option value="">Gender</option>
            <option>Male</option>
            <option>Female</option>
          </select>

          <input name="Telephone" value={formData.Telephone} onChange={handleChange} placeholder="Phone" className="border p-2 rounded" />

          <input name="LicenseNumber" value={formData.LicenseNumber} onChange={handleChange} placeholder="License" className="border p-2 rounded" />

          <input name="Address" value={formData.Address} onChange={handleChange} placeholder="Address" className="border p-2 rounded" />

          <input type="date" name="HireDate" value={formData.HireDate} onChange={handleChange} className="border p-2 rounded" />

          <button className="col-span-2 bg-blue-600 text-white p-2 rounded">
            {editId ? "Update" : "Save"}
          </button>

        </form>
      </div>

      {/* TABLE */}
      <div className="bg-white p-3 rounded shadow max-w-5xl mx-auto overflow-x-auto">

        <table className="w-full text-sm">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th>ID</th><th>Name</th><th>Phone</th><th>License</th><th>Action</th>
            </tr>
          </thead>

          <tbody>
            {drivers.map(d => (
              <tr key={d.DriverID} className="text-center border-b">
                <td>{d.DriverID}</td>
                <td>{d.FirstName} {d.LastName}</td>
                <td>{d.Telephone}</td>
                <td>{d.LicenseNumber}</td>
                <td>
                  <button onClick={() => editDriver(d)} className="bg-yellow-500 px-2 text-white mr-1">Edit</button>
                  <button onClick={() => deleteDriver(d.DriverID)} className="bg-red-600 px-2 text-white">Del</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </div>
  );
}

export default Driver;
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use(cors());
app.use(bodyParser.json());

// ===================== DATABASE =====================
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "fms"
});

// ===================== CONNECT =====================
db.connect((err) => {
  if (err) console.log(err);
  else console.log("Database Connected");
});

// ===================== CREATE DRIVER =====================
app.post("/drivers", (req, res) => {
  const sql = `
    INSERT INTO driver
    (FirstName, LastName, Gender, Telephone, LicenseNumber, Address, HireDate)
    VALUES (?,?,?,?,?,?,?)
  `;

  db.query(sql, [
    req.body.FirstName,
    req.body.LastName,
    req.body.Gender,
    req.body.Telephone,
    req.body.LicenseNumber,
    req.body.Address,
    req.body.HireDate
  ], (err, result) => {
    if (err) return res.json(err);
    res.json({ message: "Driver Created" });
  });
});

// ===================== READ DRIVERS =====================
app.get("/drivers", (req, res) => {
  db.query("SELECT * FROM driver", (err, result) => {
    if (err) return res.json(err);
    res.json(result);
  });
});

// ===================== UPDATE DRIVER =====================
app.put("/drivers/:id", (req, res) => {
  const sql = `
    UPDATE driver SET
    FirstName=?,
    LastName=?,
    Gender=?,
    Telephone=?,
    LicenseNumber=?,
    Address=?,
    HireDate=?
    WHERE DriverID=?
  `;

  db.query(sql, [
    req.body.FirstName,
    req.body.LastName,
    req.body.Gender,
    req.body.Telephone,
    req.body.LicenseNumber,
    req.body.Address,
    req.body.HireDate,
    req.params.id
  ], (err, result) => {
    if (err) return res.json(err);
    res.json({ message: "Driver Updated" });
  });
});

// ===================== DELETE DRIVER =====================
app.delete("/drivers/:id", (req, res) => {
  db.query(
    "DELETE FROM driver WHERE DriverID=?",
    [req.params.id],
    (err, result) => {
      if (err) return res.json(err);
      res.json({ message: "Driver Deleted" });
    }
  );
});

// ===================== SERVER =====================
app.listen(5000, () => {
  console.log("Server running on port 5000");
});
// ================= CREATE =================
app.post("/vehicles", (req, res) => {

  const sql = `
    INSERT INTO vehicle
    (VehicleCode, PlateNumber, VehicleType, Brand, Capacity, Status, PurchaseDate)
    VALUES (?,?,?,?,?,?,?)
  `;

  db.query(sql, [
    req.body.VehicleCode,
    req.body.PlateNumber,
    req.body.VehicleType,
    req.body.Brand,
    req.body.Capacity,
    req.body.Status,
    req.body.PurchaseDate
  ], (err, result) => {
    if (err) return res.json(err);
    res.json({ message: "Vehicle Created" });
  });
});

// ================= READ =================
app.get("/vehicles", (req, res) => {
  db.query("SELECT * FROM vehicle", (err, result) => {
    if (err) return res.json(err);
    res.json(result);
  });
});

// ================= UPDATE =================
app.put("/vehicles/:id", (req, res) => {

  const sql = `
    UPDATE vehicle SET
    PlateNumber=?,
    VehicleType=?,
    Brand=?,
    Capacity=?,
    Status=?,
    PurchaseDate=?
    WHERE VehicleCode=?
  `;

  db.query(sql, [
    req.body.PlateNumber,
    req.body.VehicleType,
    req.body.Brand,
    req.body.Capacity,
    req.body.Status,
    req.body.PurchaseDate,
    req.params.id
  ], (err, result) => {
    if (err) return res.json(err);
    res.json({ message: "Vehicle Updated" });
  });
});

// ================= DELETE =================
app.delete("/vehicles/:id", (req, res) => {

  db.query(
    "DELETE FROM vehicle WHERE VehicleCode=?",
    [req.params.id],
    (err, result) => {
      if (err) return res.json(err);
      res.json({ message: "Vehicle Deleted" });
    }
  );

});
// ================= CREATE =================
app.post("/trips", (req, res) => {

  const sql = `
    INSERT INTO trip
    (DriverID, VehicleCode, DepartureLocation, Destination, DepartureDate, ReturnDate, FuelUsed, TripStatus)
    VALUES (?,?,?,?,?,?,?,?)
  `;

  db.query(sql, [
    req.body.DriverID,
    req.body.VehicleCode,
    req.body.DepartureLocation,
    req.body.Destination,
    req.body.DepartureDate,
    req.body.ReturnDate,
    req.body.FuelUsed,
    req.body.TripStatus
  ], (err, result) => {
    if (err) return res.json(err);
    res.json({ message: "Trip Created" });
  });
});

// ================= READ =================
app.get("/trips", (req, res) => {

  db.query("SELECT * FROM trip", (err, result) => {
    if (err) return res.json(err);
    res.json(result);
  });

});

// ================= UPDATE =================
app.put("/trips/:id", (req, res) => {

  const sql = `
    UPDATE trip SET
    DriverID=?,
    VehicleCode=?,
    DepartureLocation=?,
    Destination=?,
    DepartureDate=?,
    ReturnDate=?,
    FuelUsed=?,
    TripStatus=?
    WHERE TripID=?
  `;

  db.query(sql, [
    req.body.DriverID,
    req.body.VehicleCode,
    req.body.DepartureLocation,
    req.body.Destination,
    req.body.DepartureDate,
    req.body.ReturnDate,
    req.body.FuelUsed,
    req.body.TripStatus,
    req.params.id
  ], (err, result) => {
    if (err) return res.json(err);
    res.json({ message: "Trip Updated" });
  });

});

// ================= DELETE =================
app.delete("/trips/:id", (req, res) => {

  db.query(
    "DELETE FROM trip WHERE TripID=?",
    [req.params.id],
    (err, result) => {
      if (err) return res.json(err);
      res.json({ message: "Trip Deleted" });
    }
  );

});

// =====================================================
// ===================== DRIVERS =======================
// =====================================================

// GET DRIVERS
app.get("/drivers", (req, res) => {
  db.query("SELECT * FROM driver", (err, result) => {
    if (err) return res.json(err);
    res.json(result);
  });
});

// CREATE DRIVER
app.post("/drivers", (req, res) => {
  const sql = `
    INSERT INTO driver
    (FirstName, LastName, Gender, Telephone, LicenseNumber, Address, HireDate)
    VALUES (?,?,?,?,?,?,?)
  `;

  db.query(sql, [
    req.body.FirstName,
    req.body.LastName,
    req.body.Gender,
    req.body.Telephone,
    req.body.LicenseNumber,
    req.body.Address,
    req.body.HireDate
  ], (err) => {
    if (err) return res.json(err);
    res.json({ message: "Driver added" });
  });
});


// =====================================================
// ===================== VEHICLES ======================
// =====================================================

// GET VEHICLES
app.get("/vehicles", (req, res) => {
  db.query("SELECT * FROM vehicle", (err, result) => {
    if (err) return res.json(err);
    res.json(result);
  });
});

// CREATE VEHICLE
app.post("/vehicles", (req, res) => {
  const sql = `
    INSERT INTO vehicle
    (VehicleCode, PlateNumber, VehicleType, Brand, Capacity, Status, PurchaseDate)
    VALUES (?,?,?,?,?,?,?)
  `;

  db.query(sql, [
    req.body.VehicleCode,
    req.body.PlateNumber,
    req.body.VehicleType,
    req.body.Brand,
    req.body.Capacity,
    req.body.Status,
    req.body.PurchaseDate
  ], (err) => {
    if (err) return res.json(err);
    res.json({ message: "Vehicle added" });
  });
});


// =====================================================
// ===================== TRIPS =========================
// =====================================================

// GET TRIPS
app.get("/trips", (req, res) => {
  db.query("SELECT * FROM trip", (err, result) => {
    if (err) return res.json(err);
    res.json(result);
  });
});

// CREATE TRIP
app.post("/trips", (req, res) => {
  const sql = `
    INSERT INTO trip
    (DriverID, VehicleCode, DepartureLocation, Destination, DepartureDate, ReturnDate, FuelUsed, TripStatus)
    VALUES (?,?,?,?,?,?,?,?)
  `;

  db.query(sql, [
    req.body.DriverID,
    req.body.VehicleCode,
    req.body.DepartureLocation,
    req.body.Destination,
    req.body.DepartureDate,
    req.body.ReturnDate,
    req.body.FuelUsed,
    req.body.TripStatus
  ], (err) => {
    if (err) return res.json(err);
    res.json({ message: "Trip created" });
  });
});

// UPDATE TRIP
app.put("/trips/:id", (req, res) => {
  const sql = `
    UPDATE trip SET
    DriverID=?,
    VehicleCode=?,
    DepartureLocation=?,
    Destination=?,
    DepartureDate=?,
    ReturnDate=?,
    FuelUsed=?,
    TripStatus=?
    WHERE TripID=?
  `;

  db.query(sql, [
    req.body.DriverID,
    req.body.VehicleCode,
    req.body.DepartureLocation,
    req.body.Destination,
    req.body.DepartureDate,
    req.body.ReturnDate,
    req.body.FuelUsed,
    req.body.TripStatus,
    req.params.id
  ], (err) => {
    if (err) return res.json(err);
    res.json({ message: "Trip updated" });
  });
});

// DELETE TRIP
app.delete("/trips/:id", (req, res) => {
  db.query("DELETE FROM trip WHERE TripID=?", [req.params.id], (err) => {
    if (err) return res.json(err);
    res.json({ message: "Trip deleted" });
  });
});


// =====================================================
// ===================== REPORTS (JOIN) ===============
// =====================================================

// THIS MATCHES YOUR REACT REPORTS PAGE
app.get("/reports", (req, res) => {

  const sql = `
    SELECT 
      t.TripID,
      d.FirstName,
      d.LastName,
      v.PlateNumber,
      t.DepartureLocation,
      t.Destination,
      t.DepartureDate,
      t.ReturnDate,
      t.FuelUsed,
      t.TripStatus
    FROM trip t
    JOIN driver d ON t.DriverID = d.DriverID
    JOIN vehicle v ON t.VehicleCode = v.VehicleCode
  `;

  db.query(sql, (err, result) => {
    if (err) return res.json(err);
    res.json(result);
  });
});
// ==========================================
// REGISTER USER
// ==========================================

app.post("/register", (req, res) => {

  const { username, password } = req.body;

  const sql = "INSERT INTO users (username, password) VALUES (?, ?)";

  db.query(sql, [username, password], (err) => {

    if (err) {
      return res.json({ success: false, message: err });
    }

    return res.json({ success: true });
  });
});

// ==========================================
// LOGIN USER
// ==========================================

app.post("/login", (req, res) => {

  const { username, password } = req.body;

  const sql = "SELECT * FROM users WHERE username=? AND password=?";

  db.query(sql, [username, password], (err, result) => {

    if (err) {
      return res.json({ success: false, message: err });
    }

    if (result.length > 0) {
      return res.json({ success: true, user: result[0] });
    } else {
      return res.json({ success: false });
    }
  });
});
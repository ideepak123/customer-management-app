const express = require("express");
const db = require("../db/database"); // Ensure path is correct
const router = express.Router();

// GET ALL CUSTOMERS
router.get("/", (req, res) => {
  db.all("SELECT * FROM customers", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// GET SINGLE CUSTOMER (Required for CustomerDetails.js)
router.get("/:id", (req, res) => {
  const sql = "SELECT * FROM customers WHERE id = ?";
  db.get(sql, [req.params.id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ message: "Customer not found" });
    res.json(row);
  });
});

// CREATE CUSTOMER
router.post("/", (req, res) => {
  const { first_name, last_name, phone, city, state, pincode } = req.body;
  const sql = `INSERT INTO customers (first_name, last_name, phone, city, state, pincode) VALUES (?, ?, ?, ?, ?, ?)`;
  const params = [first_name, last_name, phone, city, state, pincode];

  db.run(sql, params, function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: this.lastID });
  });
});

// UPDATE CUSTOMER
router.put("/:id", (req, res) => {
  const { first_name, last_name, phone } = req.body;
  const sql = `UPDATE customers SET first_name = ?, last_name = ?, phone = ? WHERE id = ?`;
  db.run(sql, [first_name, last_name, phone, req.params.id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ updated: this.changes });
  });
});

// DELETE CUSTOMER
router.delete("/:id", (req, res) => {
  db.run("DELETE FROM customers WHERE id = ?", [req.params.id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ deleted: this.changes });
  });
});

module.exports = router; // CRITICAL: Allows app.js to use these routes
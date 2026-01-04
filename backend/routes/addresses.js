const express = require("express");
const db = require("../db/database");
const router = express.Router();

// ADD ADDRESS
router.post("/", (req, res) => {
  const { customer_id, address_line, city, state, pincode } = req.body;

  db.run(
    `INSERT INTO addresses 
     (customer_id, address_line, city, state, pincode)
     VALUES (?, ?, ?, ?, ?)`,
    [customer_id, address_line, city, state, pincode],
    function (err) {
      if (err) {
        res.status(500).json(err);
      } else {
        res.json({ message: "Address added" });
      }
    }
  );
});

// GET ADDRESSES BY CUSTOMER
router.get("/:customerId", (req, res) => {
  db.all(
    "SELECT * FROM addresses WHERE customer_id=?",
    [req.params.customerId],
    (err, rows) => res.json(rows)
  );
});

module.exports = router;

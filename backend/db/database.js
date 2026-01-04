const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./database.db", (err) => {
  if (err) {
    console.error("SQLite error:", err.message);
  } else {
    console.log("SQLite connected");
  }
});

// Customers table
db.run(`
CREATE TABLE IF NOT EXISTS customers (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  first_name TEXT,
  last_name TEXT,
  phone TEXT,
  city TEXT,
  state TEXT,
  pincode TEXT
)
`);


db.run(`
CREATE TABLE IF NOT EXISTS addresses (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  customer_id INTEGER,
  address_line TEXT,
  city TEXT,
  state TEXT,
  pincode TEXT,
  FOREIGN KEY (customer_id) REFERENCES customers(id)
)
`);

module.exports = db;

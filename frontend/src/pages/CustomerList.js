import React, { useEffect, useState } from "react";
import api from "../api";
import { Link } from "react-router-dom";

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    api.get("/customers")
      .then((res) => setCustomers(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Customer List</h1>
      <Link to="/create">Add Customer</Link>
      <div style={{ marginTop: "20px" }}>
        {customers.length === 0 ? (
          <p>No customers found.</p>
        ) : (
          customers.map((customer) => (
            <div
              key={customer.id}
              style={{
                border: "1px solid #ccc",
                padding: "10px",
                margin: "10px 0",
                borderRadius: "8px",
              }}
            >
              {/* FIX: Using the correct DB fields instead of customer.name */}
              <h3>{customer.first_name} {customer.last_name}</h3>
              <p>Phone: {customer.phone}</p>
              <p>
                City: {customer.city}, {customer.state} - {customer.pincode}
              </p>
              <Link to={`/customer/${customer.id}`}>View Details</Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CustomerList;
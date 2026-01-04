import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api";

const CustomerDetails = () => {
  const { id } = useParams();
  const [customer, setCustomer] = useState(null);
  const [addresses, setAddresses] = useState([]); // Added for multiple addresses

  useEffect(() => {
    // 1. Fetch Customer Info
    api.get(`/customers/${id}`)
      .then((res) => setCustomer(res.data))
      .catch((err) => console.error("Error fetching customer:", err));

    // 2. Fetch Customer Addresses (Required for Assignment)
    api.get(`/addresses/${id}`)
      .then((res) => setAddresses(res.data))
      .catch((err) => console.error("Error fetching addresses:", err));
  }, [id]);

  if (!customer) return <div style={{ padding: "20px" }}>Loading... If this stays blank, check your App.js Routes!</div>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Customer Profile</h2>
      <div style={{ border: "1px solid #ddd", padding: "15px", borderRadius: "8px" }}>
        <p><strong>Name:</strong> {customer.first_name} {customer.last_name}</p>
        <p><strong>Phone:</strong> {customer.phone}</p>
        <p><strong>Location:</strong> {customer.city}, {customer.state} ({customer.pincode})</p>
      </div>

      <h3 style={{ marginTop: "30px" }}>Addresses</h3>
      {addresses.length === 0 ? (
        <p>No addresses found for this customer.</p>
      ) : (
        addresses.map((addr) => (
          <div key={addr.id} style={{ borderBottom: "1px solid #eee", padding: "10px 0" }}>
            <p>{addr.address_line}, {addr.city}, {addr.state} - {addr.pincode}</p>
          </div>
        ))
      )}
      
      {/* Indication for assignment: Single vs Multiple */}
      <p style={{ color: "gray", fontSize: "12px" }}>
        Status: {addresses.length > 1 ? "Multiple Addresses" : "Single Address"}
      </p>

      <div style={{ marginTop: "20px" }}>
        <Link to="/">Back to List</Link>
      </div>
    </div>
  );
};

export default CustomerDetails;
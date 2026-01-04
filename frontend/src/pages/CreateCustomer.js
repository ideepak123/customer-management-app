import React, { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

const CreateCustomer = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    city: "",
    state: "",
    pinCode: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // CHALLENGE: Mapping camelCase to snake_case for the DB
      const dataToSend = {
        first_name: formData.firstName,
        last_name: formData.lastName,
        phone: formData.phone,
        city: formData.city,
        state: formData.state,
        pincode: formData.pinCode, // Matching your database.js schema
      };

      await api.post("/customers", dataToSend);
      alert("Customer added successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error adding customer:", error);
      alert("Failed to add customer. Check console.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Add New Customer</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="First Name"
          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
          required
        />
        <input
          placeholder="Last Name"
          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
          required
        />
        <input
          placeholder="Phone"
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          required
        />
        <input
          placeholder="City"
          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
          required
        />
        <input
          placeholder="State"
          onChange={(e) => setFormData({ ...formData, state: e.target.value })}
          required
        />
        <input
          placeholder="Pincode"
          onChange={(e) => setFormData({ ...formData, pinCode: e.target.value })}
          required
        />
        <button type="submit">Save Customer</button>
      </form>
    </div>
  );
};

export default CreateCustomer;
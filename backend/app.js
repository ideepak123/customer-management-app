const express = require("express");
const cors = require("cors");
const customersRoutes = require("./routes/customers");
const addressesRoutes = require("./routes/addresses"); // ADDED THIS

const app = express();

// MIDDLEWARE
app.use(cors());
app.use(express.json()); // Essential for handling POST/PUT requests

// ROUTES - Linking your route files to the app
app.use("/customers", customersRoutes); // This makes routes available at http://localhost:5000/customers
app.use("/addresses", addressesRoutes); // This makes routes available at http://localhost:5000/addresses

// DYNAMIC PORT FOR DEPLOYMENT (Required for Render)
const PORT = process.env.PORT || 5000; 

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
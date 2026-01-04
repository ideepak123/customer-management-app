import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import CustomerList from "./pages/CustomerList";
import CreateCustomer from "./pages/CreateCustomer";
import CustomerDetails from "./pages/CustomerDetails";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CustomerList />} />
        <Route path="/create" element={<CreateCustomer />} />

        {/* 🔥 THIS IS THE MISSING ROUTE */}
        <Route path="/customer/:id" element={<CustomerDetails />} />
      </Routes>
    </Router>
  );
}

export default App;

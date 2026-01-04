import { BrowserRouter, Routes, Route } from "react-router-dom";
import CustomerList from "./pages/CustomerList";
import CreateCustomer from "./pages/CreateCustomer";
import CustomerDetails from "./pages/CustomerDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CustomerList />} />
        <Route path="/create" element={<CreateCustomer />} />
        <Route path="/customers/:id" element={<CustomerDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

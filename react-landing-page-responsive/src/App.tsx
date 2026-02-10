import { Routes, Route } from "react-router-dom";
import Landing from "./pages/landing/Landing";
import SignIn from "./pages/auth/SignIn";
import Signup from "./pages/auth/Signup"; // ✅ add this
import Dashboard from "./pages/user_dashboard/Dashboard";
import CompanyDashboard from "./pages/company_dashboard/CompanyDashboard";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<Signup />} /> {/* ✅ enable */}
      <Route path="/dashboard" element={<Dashboard />} />
      {/* Company dashboard */}
      <Route path="/company/dashboard" element={<CompanyDashboard />} />

    </Routes>
  );
}

export default App;
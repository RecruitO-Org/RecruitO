import { Routes, Route } from "react-router-dom";

import Landing from "./pages/landing/Landing";
import SignIn from "./pages/auth/SignIn";
import Signup from "./pages/auth/Signup";

import DashboardLayout from "./pages/user_dashboard/DashboardLayout";
import DashboardHome from "./pages/user_dashboard/DashboardHome";
import Profile from "./pages/user_dashboard/Profile";
import Jobs from "./pages/user_dashboard/Jobs";
import Internships from "./pages/user_dashboard/Internships";
import Resume from "./pages/user_dashboard/Resume";
import AIChatbot from "./pages/user_dashboard/AIChatbot";
import Settings from "./pages/user_dashboard/Settings";
import Interviews from "./pages/user_dashboard/Interviews";

import CompanyDashboard from "./pages/company_dashboard/CompanyDashboard";

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Landing />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<Signup />} />

      {/* User Dashboard (Nested Properly) */}
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<DashboardHome />} />
        <Route path="profile" element={<Profile />} />
        <Route path="jobs" element={<Jobs />} />
        <Route path="internships" element={<Internships />} />
        <Route path="resume" element={<Resume />} />
        <Route path="chatbot" element={<AIChatbot />} />
        <Route path="settings" element={<Settings />} />
        <Route path="interview" element={<Interviews />} />
      </Route>

      {/* Company Dashboard */}
      <Route path="/company/dashboard" element={<CompanyDashboard />} />
    </Routes>
  );
}

export default App;
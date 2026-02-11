import { Routes, Route } from "react-router-dom";

import Landing from "./pages/landing/Landing";
import SignIn from "./pages/auth/SignIn";
import Signup from "./pages/auth/Signup";

/* ================= COMPANY DASHBOARD ================= */

import CompanyDashboard from "./pages/company_dashboard/CompanyDashboard";
import Applicants from "./pages/company_dashboard/Applicants";
import ApplicantDetail from "./pages/company_dashboard/ApplicantDetail";
import JobPostings from "./pages/company_dashboard/JobPostings";
import JobDetail from "./pages/company_dashboard/JobDetail";
import CompanyProfile from "./pages/company_dashboard/CompanyProfile";
import Analytics from "./pages/company_dashboard/Analytics";
import Interview from "./pages/company_dashboard/Interview";
import Setting from "./pages/company_dashboard/Settings_company";
import { JobsProvider } from "./pages/company_dashboard/JobsContext";

/* ================= USER DASHBOARD ================= */

import DashboardLayout from "./pages/user_dashboard/DashboardLayout";
import DashboardHome from "./pages/user_dashboard/DashboardHome";
import Profile from "./pages/user_dashboard/Profile";
import Jobs from "./pages/user_dashboard/Jobs";
import Internships from "./pages/user_dashboard/Internships";
import Resume from "./pages/user_dashboard/Resume";
import AIChatbot from "./pages/user_dashboard/AIChatbot";
import Settings from "./pages/user_dashboard/Settings";
import Interviews from "./pages/user_dashboard/Interviews";

function App() {
  return (
    <JobsProvider>
      <Routes>

        {/* Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<Signup />} />

        {/* ================= COMPANY ROUTES ================= */}
        <Route path="/company/dashboard" element={<CompanyDashboard />} />
        <Route path="/company/applicants" element={<Applicants />} />
        <Route path="/company/applicants/:id" element={<ApplicantDetail />} />
        <Route path="/company/job-postings" element={<JobPostings />} />
        <Route path="/company/job-postings/:id" element={<JobDetail />} />
        <Route path="/company/profile" element={<CompanyProfile />} />
        <Route path="/company/analytics" element={<Analytics />} />
        <Route path="/company/interview" element={<Interview />} />
        <Route path="/company/setting" element={<Setting />} />

        {/* ================= USER DASHBOARD (Nested) ================= */}
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

      </Routes>
    </JobsProvider>
  );
}

export default App;

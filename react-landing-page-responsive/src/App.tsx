import { Routes, Route } from "react-router-dom";
import Landing from "./pages/landing/Landing";
import SignIn from "./pages/auth/SignIn";
import Signup from "./pages/auth/Signup";
import Dashboard from "./pages/user_dashboard/Dashboard";
import CompanyDashboard from "./pages/company_dashboard/CompanyDashboard";
import Applicants from "./pages/company_dashboard/Applicants";
import ApplicantDetail from "./pages/company_dashboard/ApplicantDetail";
import JobPostings from "./pages/company_dashboard/JobPostings";
import JobDetail from "./pages/company_dashboard/JobDetail";
import { JobsProvider } from "./pages/company_dashboard/JobsContext";
import CompanyProfile from "./pages/company_dashboard/CompanyProfile";
import Analytics from "./pages/company_dashboard/Analytics";
import Interviews from "./pages/company_dashboard/Interviews";
import Settings from "./pages/company_dashboard/Settings";



function App() {
  return (
    <JobsProvider>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Company Dashboard */}
        <Route path="/company/dashboard" element={<CompanyDashboard />} />
        <Route path="/company/applicants" element={<Applicants />} />
        <Route path="/company/applicants/:id" element={<ApplicantDetail />} />
        <Route path="/company/job-postings" element={<JobPostings />} />
        <Route path="/company/job-postings/:id" element={<JobDetail />} />
        <Route path="/company/profile" element={<CompanyProfile />} />
        <Route path="/company/analytics" element={<Analytics />} />
        <Route path="/company/interviews" element={<Interviews />} />
        <Route path="/company/settings" element={<Settings />} />
        
      </Routes>
    </JobsProvider>
  );
}

export default App;

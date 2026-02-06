import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // later we’ll clear auth token
    navigate("/signin");
  };

  return (
    <div className="min-h-screen bg-body px-6 py-6">
      {/* Header */}
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-heading-1">
          Dashboard
        </h1>

        <button
          onClick={handleLogout}
          className="px-4 py-2 rounded-lg
          bg-red-500 text-white font-medium
          hover:bg-red-600 transition"
        >
          Logout
        </button>
      </header>

      {/* Main content */}
      <main className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div className="p-6 rounded-xl bg-box-bg border border-box-border">
          <h2 className="text-lg font-semibold text-heading-1">
            Profile
          </h2>
          <p className="text-heading-3 mt-2">
            Complete your profile information
          </p>
        </div>

        <div className="p-6 rounded-xl bg-box-bg border border-box-border">
          <h2 className="text-lg font-semibold text-heading-1">
            Applications
          </h2>
          <p className="text-heading-3 mt-2">
            Track your job applications
          </p>
        </div>

        <div className="p-6 rounded-xl bg-box-bg border border-box-border">
          <h2 className="text-lg font-semibold text-heading-1">
            Jobs
          </h2>
          <p className="text-heading-3 mt-2">
            Explore job opportunities
          </p>
        </div>
      </main>
    </div>
  );
}

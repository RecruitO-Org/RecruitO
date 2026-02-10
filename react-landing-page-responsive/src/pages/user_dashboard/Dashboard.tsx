import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./dashboard.css";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

export default function Dashboard() {
  const navigate = useNavigate();

  // 🌙 Dark mode state
  const [isDark, setIsDark] = useState(false);

  // Load saved theme on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    }
  }, []);

  const toggleTheme = () => {
    document.documentElement.classList.toggle("dark");
    const newTheme = document.documentElement.classList.contains("dark")
      ? "dark"
      : "light";

    localStorage.setItem("theme", newTheme);
    setIsDark(newTheme === "dark");
  };

  const handleLogout = () => {
    navigate("/signin");
  };

  return (
    <div className="dashboard-root min-h-screen bg-background px-6 py-6">
      {/* ================= Header ================= */}
      <header className="dashboard-header flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">RecruitO</h1>

        <div className="flex items-center gap-4">
          {/* 🌙 Theme toggle */}
          <Button variant="outline" onClick={toggleTheme}>
            {isDark ? "☀️ Light" : "🌙 Dark"}
          </Button>

          <Avatar>
            <AvatarFallback>U</AvatarFallback>
          </Avatar>

          <Button variant="destructive" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </header>

      {/* ================= Welcome ================= */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold">Welcome back 👋</h2>
        <p className="text-muted-foreground">
          Here’s your job search overview
        </p>
      </section>

      {/* ================= Profile Status ================= */}
      <section className="grid gap-6 mb-8 sm:grid-cols-3">
        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle>Profile Completion</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="stat-value text-2xl font-bold">70%</p>
          </CardContent>
        </Card>

        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle>Resume</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="stat-value text-2xl font-bold">Uploaded</p>
          </CardContent>
        </Card>

        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle>Skills Added</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="stat-value text-2xl font-bold">Yes</p>
          </CardContent>
        </Card>
      </section>

      {/* ================= Stats ================= */}
      <section className="grid gap-6 mb-8 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle>Jobs Applied</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="stat-value text-3xl font-bold">5</p>
          </CardContent>
        </Card>

        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle>Under Review</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="stat-value text-3xl font-bold">2</p>
          </CardContent>
        </Card>

        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle>Saved Jobs</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="stat-value text-3xl font-bold">4</p>
          </CardContent>
        </Card>

        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle>Interviews</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="stat-value text-3xl font-bold">1</p>
          </CardContent>
        </Card>
      </section>

      {/* ================= Action Cards ================= */}
      <section className="grid gap-6 mb-8 sm:grid-cols-2 lg:grid-cols-3">
        <Card className="dashboard-card cursor-pointer">
          <CardHeader>
            <CardTitle>Edit Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Update skills, education & resume
            </p>
          </CardContent>
        </Card>

        <Card className="dashboard-card cursor-pointer">
          <CardHeader>
            <CardTitle>Browse Jobs</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Explore jobs matching your profile
            </p>
          </CardContent>
        </Card>

        <Card className="dashboard-card cursor-pointer">
          <CardHeader>
            <CardTitle>My Applications</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Track your job applications
            </p>
          </CardContent>
        </Card>
      </section>

      {/* ================= Recent Activity ================= */}
      <section>
        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <Separator className="mb-4" />
            <ul className="space-y-2 text-muted-foreground">
              <li>• Applied for Frontend Intern at XYZ</li>
              <li>• Profile updated yesterday</li>
              <li>• Resume uploaded</li>
            </ul>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

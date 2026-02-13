import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion } from "framer-motion";

export default function Internships() {
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("All Locations");
  const [detecting, setDetecting] = useState(false);

  const internships = [
    {
      title: "Frontend Intern",
      company: "TechNova",
      location: "Remote",
      stipend: "₹12,000 / month",
      duration: "3 Months",
      match: 85,
      skills: ["React", "HTML", "CSS"],
    },
    {
      title: "AI/ML Intern",
      company: "FutureMind AI",
      location: "Hyderabad",
      stipend: "₹18,000 / month",
      duration: "6 Months",
      match: 72,
      skills: ["Python", "Machine Learning", "Data Analysis"],
    },
    {
      title: "Backend Intern",
      company: "CodeCraft",
      location: "Bangalore",
      stipend: "₹15,000 / month",
      duration: "4 Months",
      match: 78,
      skills: ["Node.js", "MongoDB", "APIs"],
    },
  ];

  // ================= LOCATION DETECTION =================
  const detectLocation = async () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported");
      return;
    }

    setDetecting(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;

          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const data = await res.json();

          const city =
            data.address?.city ||
            data.address?.town ||
            data.address?.state ||
            "Remote";

          setLocation(city);
        } catch (error) {
          alert("Failed to detect location");
        } finally {
          setDetecting(false);
        }
      },
      () => {
        alert("Location access denied");
        setDetecting(false);
      }
    );
  };

  // ================= FILTER LOGIC =================
  const filteredInternships = useMemo(() => {
    return internships.filter((intern) => {
      const matchesSearch =
        intern.title.toLowerCase().includes(search.toLowerCase()) ||
        intern.company.toLowerCase().includes(search.toLowerCase()) ||
        intern.skills.some((skill) =>
          skill.toLowerCase().includes(search.toLowerCase())
        );

      const matchesLocation =
        location === "All Locations" ||
        intern.location === location ||
        intern.location === "Remote";

      return matchesSearch && matchesLocation;
    });
  }, [search, location]);

  return (
    <div className="space-y-8">

      {/* ================= HEADER ================= */}
      <div>
        <h1 className="text-3xl font-bold mb-2 text-white">
          Explore Internships
        </h1>
        <p className="text-gray-400">
          AI-matched internships based on your skills & resume
        </p>
      </div>

      {/* ================= SEARCH + FILTER ================= */}
      <div className="flex flex-col md:flex-row gap-4">

        {/* Search */}
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search internships..."
          className="flex-1 px-5 py-3 rounded-xl bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-violet-500 text-white placeholder:text-gray-400"
        />

        {/* Location Select */}
        <Select value={location} onValueChange={setLocation}>
          <SelectTrigger
            className={`w-[220px] rounded-xl bg-white/5 border border-white/10 text-white 
            ${location !== "All Locations" ? "ring-2 ring-violet-500/40" : ""}`}
          >
            <SelectValue />
          </SelectTrigger>

          <SelectContent className="bg-[#0f172a] border border-white/10 text-white">
            <SelectItem value="All Locations" className="text-white focus:bg-white/10">
              All Locations
            </SelectItem>
            <SelectItem value="Remote" className="text-white focus:bg-white/10">
              Remote
            </SelectItem>
            <SelectItem value="Bangalore" className="text-white focus:bg-white/10">
              Bangalore
            </SelectItem>
            <SelectItem value="Hyderabad" className="text-white focus:bg-white/10">
              Hyderabad
            </SelectItem>
          </SelectContent>
        </Select>

        {/* Detect */}
        <Button
          variant="outline"
          onClick={detectLocation}
          disabled={detecting}
          className="rounded-xl border-white/10 bg-white/5 hover:bg-white/10 text-white"
        >
          {detecting ? "Detecting..." : "📍 Detect"}
        </Button>

        {/* Filter Button */}
        <Button className="px-6 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 hover:opacity-90">
          Filter
        </Button>
      </div>

      {/* ================= INTERNSHIP CARDS ================= */}
      <div className="grid md:grid-cols-2 gap-6">

        {filteredInternships.length === 0 && (
          <p className="text-gray-400">No internships found.</p>
        )}

        {filteredInternships.map((intern, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-6 rounded-2xl bg-white/5 border border-white/10 shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all backdrop-blur-md"
          >
            {/* Top */}
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-xl font-semibold text-white">
                  {intern.title}
                </h2>
                <p className="text-gray-400">
                  {intern.company} • {intern.location}
                </p>
              </div>

              <div className="text-sm font-semibold text-violet-400">
                {intern.match}% Match
              </div>
            </div>

            {/* Stipend + Duration */}
            <p className="mb-2 text-sm text-gray-400">
              💰 {intern.stipend}
            </p>
            <p className="mb-3 text-sm text-gray-400">
              ⏳ {intern.duration}
            </p>

            {/* Skills */}
            <div className="flex flex-wrap gap-2 mb-4">
              {intern.skills.map((skill, i) => (
                <span
                  key={i}
                  className="px-3 py-1 text-xs rounded-full bg-violet-600/20 text-violet-300"
                >
                  {skill}
                </span>
              ))}
            </div>

            {/* Buttons */}
            <div className="flex justify-between items-center">
              <Button
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10"
              >
                View Details
              </Button>

              <Button className="bg-gradient-to-r from-violet-600 to-blue-600 hover:opacity-90">
                Apply Now
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
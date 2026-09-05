import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { api } from "../../lib/api";

interface ProfileData {
  id: number;
  name: string;
  email: string;
  role: string;
  phone: string | null;
  category: string | null;
  skills: string[] | null;
  created_at: string;
}

interface ResumeData {
  id: number;
  original_filename: string;
  extension: string | null;
  uploaded_at: string;
}

export default function Profile() {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [resume, setResume] = useState<ResumeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [category, setCategory] = useState("");
  const [skills, setSkills] = useState("");

  useEffect(() => {
    setLoading(true);
    Promise.all([
      api.get<ProfileData>("/profile"),
      api.get<ResumeData>("/resume").catch(() => null),
    ])
      .then(([profileData, resumeData]) => {
        setProfile(profileData);
        setName(profileData.name);
        setPhone(profileData.phone || "");
        setCategory(profileData.category || "");
        setSkills((profileData.skills || []).join(", "));
        if (resumeData) setResume(resumeData);
      })
      .catch((e) =>
        setError(e instanceof Error ? e.message : "Failed to load profile")
      )
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    setSuccess(null);
    try {
      const skillsArray = skills
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
      const updated = await api.put<ProfileData>("/profile", {
        name,
        phone: phone || null,
        category: category || null,
        skills: skillsArray.length > 0 ? skillsArray : null,
      });
      setProfile(updated);
      setName(updated.name);
      setPhone(updated.phone || "");
      setCategory(updated.category || "");
      setSkills((updated.skills || []).join(", "));
      setIsEditing(false);
      setSuccess("Profile updated successfully");
      setTimeout(() => setSuccess(null), 3000);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to save profile");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    if (profile) {
      setName(profile.name);
      setPhone(profile.phone || "");
      setCategory(profile.category || "");
      setSkills((profile.skills || []).join(", "));
    }
    setIsEditing(false);
    setError(null);
  };

  const initials = name
    ? name
        .split(" ")
        .map((p) => p[0])
        .filter(Boolean)
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "U";

  if (loading) {
    return (
      <div className="max-w-6xl space-y-8">
        <h1 className="text-4xl font-bold">Profile</h1>
        <p className="text-white/50">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl space-y-8">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold">Profile</h1>
          <p className="text-white/50">
            Manage your personal and professional information
          </p>
        </div>

        {!isEditing ? (
          <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
        ) : (
          <div className="flex gap-3">
            <Button variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={saving}>
              {saving ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        )}
      </div>

      {/* STATUS MESSAGES */}
      {error && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
          {error}
        </div>
      )}
      {success && (
        <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 text-sm">
          {success}
        </div>
      )}

      {/* PROFILE CARD */}
      <div className="p-10 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl">

        {/* TOP SECTION */}
        <div className="flex items-center gap-8 mb-10">

          <div className="w-24 h-24 rounded-full bg-gradient-to-r from-violet-600 to-blue-600 flex items-center justify-center text-3xl font-bold">
            {initials}
          </div>

          <div>
            <h2 className="text-2xl font-semibold">{name || "Your Name"}</h2>
            <p className="text-white/50">{profile?.email}</p>
            {category && (
              <p className="text-sm mt-1 text-blue-400">{category}</p>
            )}
          </div>

        </div>

        {/* DETAILS GRID */}
        <div className="grid md:grid-cols-2 gap-8">

          {/* LEFT SIDE */}
          <div className="space-y-6">

            <div>
              <label className="text-sm text-white/50">Full Name</label>
              <input
                disabled={!isEditing}
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full mt-2 p-3 rounded-xl bg-white/10 border border-white/10 outline-none disabled:opacity-60"
              />
            </div>

            <div>
              <label className="text-sm text-white/50">Email Address</label>
              <input
                disabled
                value={profile?.email || ""}
                className="w-full mt-2 p-3 rounded-xl bg-white/10 border border-white/10 outline-none opacity-60"
              />
            </div>

            <div>
              <label className="text-sm text-white/50">Phone</label>
              <input
                disabled={!isEditing}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Add phone number"
                className="w-full mt-2 p-3 rounded-xl bg-white/10 border border-white/10 outline-none disabled:opacity-60"
              />
            </div>

            <div>
              <label className="text-sm text-white/50">Category</label>
              <input
                disabled={!isEditing}
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="e.g. Web Development"
                className="w-full mt-2 p-3 rounded-xl bg-white/10 border border-white/10 outline-none disabled:opacity-60"
              />
            </div>

          </div>

          {/* RIGHT SIDE */}
          <div className="space-y-6">

            <div>
              <label className="text-sm text-white/50">
                Skills (comma separated)
              </label>
              <textarea
                disabled={!isEditing}
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                placeholder="e.g. React, TypeScript, Node.js"
                rows={4}
                className="w-full mt-2 p-3 rounded-xl bg-white/10 border border-white/10 outline-none disabled:opacity-60"
              />
            </div>

            {/* RESUME STATUS */}
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
              <p className="text-sm text-white/50">Resume Status</p>
              {resume ? (
                <>
                  <p className="font-medium text-green-400 mt-1">
                    {resume.original_filename} (.{resume.extension}) uploaded
                  </p>
                  <p className="text-xs text-white/40 mt-1">
                    Uploaded{" "}
                    {new Date(resume.uploaded_at).toLocaleDateString()}
                  </p>
                </>
              ) : (
                <p className="font-medium text-yellow-400 mt-1">
                  No resume uploaded
                </p>
              )}
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);

  const [name, setName] = useState("Shrey Ruparel");
  const [email, setEmail] = useState("shrey@email.com");
  const [category, setCategory] = useState("Web Development");
  const [skills, setSkills] = useState("React, TypeScript, Node.js");

  const aiScore = 65;

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

        <Button onClick={() => setIsEditing(!isEditing)}>
          {isEditing ? "Cancel" : "Edit Profile"}
        </Button>
      </div>

      {/* PROFILE CARD */}
      <div className="p-10 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl">

        {/* TOP SECTION */}
        <div className="flex items-center gap-8 mb-10">

          <div className="w-24 h-24 rounded-full bg-gradient-to-r from-violet-600 to-blue-600 flex items-center justify-center text-3xl font-bold">
            SR
          </div>

          <div>
            <h2 className="text-2xl font-semibold">{name}</h2>
            <p className="text-white/50">{email}</p>
            <p className="text-sm mt-1 text-blue-400">{category}</p>
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
                disabled={!isEditing}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mt-2 p-3 rounded-xl bg-white/10 border border-white/10 outline-none disabled:opacity-60"
              />
            </div>

            <div>
              <label className="text-sm text-white/50">Category</label>
              <input
                disabled={!isEditing}
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full mt-2 p-3 rounded-xl bg-white/10 border border-white/10 outline-none disabled:opacity-60"
              />
            </div>

          </div>

          {/* RIGHT SIDE */}
          <div className="space-y-6">

            <div>
              <label className="text-sm text-white/50">Skills</label>
              <textarea
                disabled={!isEditing}
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                rows={4}
                className="w-full mt-2 p-3 rounded-xl bg-white/10 border border-white/10 outline-none disabled:opacity-60"
              />
            </div>

            {/* AI MATCH SCORE */}
            <div>
              <p className="text-sm text-white/50 mb-2">
                AI Match Score
              </p>

              <div className="w-full bg-white/10 rounded-full h-3">
                <div
                  style={{ width: `${aiScore}%` }}
                  className="h-3 rounded-full bg-gradient-to-r from-violet-600 to-blue-600"
                />
              </div>

              <p className="text-right mt-1 text-sm text-blue-400">
                {aiScore}%
              </p>
            </div>

            {/* RESUME STATUS */}
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
              <p className="text-sm text-white/50">
                Resume Status
              </p>
              <p className="font-medium text-green-400 mt-1">
                Uploaded ✓
              </p>

              <Button size="sm" className="mt-3">
                Change Resume
              </Button>
            </div>

          </div>

        </div>

        {/* SAVE BUTTON */}
        {isEditing && (
          <div className="mt-8 text-right">
            <Button className="px-8">
              Save Changes
            </Button>
          </div>
        )}

      </div>

    </div>
  );
}
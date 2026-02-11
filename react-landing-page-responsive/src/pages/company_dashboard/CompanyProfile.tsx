import { useState } from "react";
import CompanyLayout from "./CompanyLayout";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function CompanyProfile(): JSX.Element {
  const [profile, setProfile] = useState({
    name: "RecruitO Pvt Ltd",
    industry: "Human Resources Tech",
    size: "50-100 Employees",
    website: "https://recruito.com",
    location: "Bangalore, India",
    about:
      "RecruitO is an AI-powered recruitment platform helping companies hire faster and smarter.",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  return (
    <CompanyLayout>
      <div className="min-h-screen text-gray-900 dark:text-white">

        {/* Premium Banner */}
        <div className="relative h-52 bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-600 dark:from-[#1E293B] dark:via-[#1E3A8A] dark:to-[#2563EB] rounded-b-3xl shadow-xl">
          <div className="absolute bottom-[-50px] left-16 flex items-end gap-6">

            <div className="w-28 h-28 rounded-2xl bg-white dark:bg-gradient-to-br dark:from-[#1E3A8A] dark:to-[#2563EB] flex items-center justify-center text-4xl font-bold shadow-xl border-4 border-white dark:border-[#0B1120] text-indigo-600 dark:text-white">
              R
            </div>

            <div className="pb-6">
              <h1 className="text-3xl font-semibold tracking-wide text-white">
                {profile.name}
              </h1>
              <p className="text-blue-100 dark:text-blue-200 text-sm mt-1">
                {profile.industry}
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 md:px-16 pt-24 pb-16">
          <div className="max-w-6xl mx-auto bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-8 md:p-12 shadow-sm dark:shadow-2xl">

            {/* Section Header */}
            <div className="mb-10">
              <h2 className="text-2xl font-semibold">
                Organization Details
              </h2>
              <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                Update your company information and branding.
              </p>
            </div>

            {/* Form Grid */}
            <div className="grid md:grid-cols-2 gap-8">

              <div>
                <label className="text-sm text-gray-600 dark:text-gray-400">
                  Company Name
                </label>
                <Input
                  name="name"
                  value={profile.name}
                  onChange={handleChange}
                  className="mt-3 bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700"
                />
              </div>

              <div>
                <label className="text-sm text-gray-600 dark:text-gray-400">
                  Industry
                </label>
                <Input
                  name="industry"
                  value={profile.industry}
                  onChange={handleChange}
                  className="mt-3 bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700"
                />
              </div>

              <div>
                <label className="text-sm text-gray-600 dark:text-gray-400">
                  Company Size
                </label>
                <Input
                  name="size"
                  value={profile.size}
                  onChange={handleChange}
                  className="mt-3 bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700"
                />
              </div>

              <div>
                <label className="text-sm text-gray-600 dark:text-gray-400">
                  Website
                </label>
                <Input
                  name="website"
                  value={profile.website}
                  onChange={handleChange}
                  className="mt-3 bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700"
                />
              </div>

              <div className="md:col-span-2">
                <label className="text-sm text-gray-600 dark:text-gray-400">
                  Location
                </label>
                <Input
                  name="location"
                  value={profile.location}
                  onChange={handleChange}
                  className="mt-3 bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700"
                />
              </div>

              <div className="md:col-span-2">
                <label className="text-sm text-gray-600 dark:text-gray-400">
                  About Company
                </label>
                <Textarea
                  name="about"
                  value={profile.about}
                  onChange={handleChange}
                  rows={4}
                  className="mt-3 bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700"
                />
              </div>

            </div>

            {/* Footer */}
            <div className="flex justify-between items-center mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Changes are saved securely.
              </p>

              <Button className="bg-indigo-600 hover:bg-indigo-700 text-white px-10 py-2 rounded-xl shadow-md hover:shadow-lg transition">
                Save Changes
              </Button>
            </div>

          </div>
        </div>

      </div>
    </CompanyLayout>
  );
}

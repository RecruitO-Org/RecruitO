import { useState, useEffect } from "react";
import CompanyLayout from "./CompanyLayout";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { api } from "../../lib/api";

interface CompanyData {
  id: number;
  name: string;
  website: string | null;
  registration_number: string | null;
  industry: string | null;
  location: string | null;
  size: string | null;
  about: string | null;
  approved: boolean;
}

export default function CompanyProfile(): JSX.Element {
  const [profile, setProfile] = useState<CompanyData>({
    id: 0,
    name: "",
    industry: "",
    size: "",
    website: "",
    location: "",
    about: "",
    registration_number: "",
    approved: true,
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    api
      .get<CompanyData>("/companies/me")
      .then((data) => {
        setProfile({
          id: data.id,
          name: data.name ?? "",
          industry: data.industry ?? "",
          size: data.size ?? "",
          website: data.website ?? "",
          location: data.location ?? "",
          about: data.about ?? "",
          registration_number: data.registration_number ?? "",
          approved: data.approved ?? true,
        });
      })
      .catch((e) =>
        setError(e instanceof Error ? e.message : "Failed to load company profile")
      )
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setSaving(true);
    setError("");
    setSuccess("");
    try {
      await api.put(`/companies/${profile.id}`, {
        name: profile.name,
        website: profile.website || null,
        registration_number: profile.registration_number || null,
        industry: profile.industry || null,
        location: profile.location || null,
        size: profile.size || null,
        about: profile.about || null,
      });
      setSuccess("Company profile updated successfully");
      setTimeout(() => setSuccess(""), 3000);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to save company profile");
    } finally {
      setSaving(false);
    }
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
                {profile.name || (loading ? "Loading..." : "Your Company")}
              </h1>
              <p className="text-blue-100 dark:text-blue-200 text-sm mt-1">
                {profile.industry || ""}
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
              {!profile.approved && (
                <p className="mt-3 inline-block px-3 py-1 rounded-lg bg-yellow-500/10 border border-yellow-500/20 text-yellow-600 dark:text-yellow-400 text-sm">
                  ⏳ Pending admin approval
                </p>
              )}
            </div>

            {error && (
              <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm">
                {error}
              </div>
            )}
            {success && (
              <div className="mb-6 p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-500 text-sm">
                {success}
              </div>
            )}

            {loading ? (
              <p className="text-gray-500 dark:text-gray-400">
                Loading company profile...
              </p>
            ) : (
            <>
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
                  value={profile.industry ?? ""}
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
                  value={profile.size ?? ""}
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
                  value={profile.website ?? ""}
                  onChange={handleChange}
                  className="mt-3 bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700"
                />
              </div>

              <div>
                <label className="text-sm text-gray-600 dark:text-gray-400">
                  Registration Number
                </label>
                <Input
                  name="registration_number"
                  value={profile.registration_number ?? ""}
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
                  value={profile.location ?? ""}
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
                  value={profile.about ?? ""}
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

              <Button
                onClick={handleSave}
                disabled={saving}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-10 py-2 rounded-xl shadow-md hover:shadow-lg transition"
              >
                {saving ? "Saving..." : "Save Changes"}
              </Button>
            </div>
            </>
            )}

          </div>
        </div>

      </div>
    </CompanyLayout>
  );
}

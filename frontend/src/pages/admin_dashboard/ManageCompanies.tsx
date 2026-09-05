import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { api } from "../../lib/api";

interface Company {
  id: number;
  name: string;
  website: string | null;
  industry: string | null;
  location: string | null;
  size: string | null;
  approved: boolean;
}

export default function Companies() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentId, setCurrentId] = useState<number | null>(null);

  useEffect(() => {
    api
      .get<Company[]>("/admin/companies")
      .then(setCompanies)
      .catch((e) =>
        setError(e instanceof Error ? e.message : "Failed to load companies")
      )
      .finally(() => setLoading(false));
  }, []);

  const toggleApproval = async (company: Company) => {
    setCurrentId(company.id);
    setError("");
    try {
      const updated = await api.put<Company>(
        `/admin/companies/${company.id}/approval?approved=${!company.approved}`
      );
      setCompanies((prev) =>
        prev.map((c) =>
          c.id === company.id ? { ...c, approved: updated.approved } : c
        )
      );
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to update company");
    } finally {
      setCurrentId(null);
    }
  };

  return (
    <div className="space-y-8">

      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-semibold">Companies</h1>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
          {error}
        </div>
      )}

      {loading ? (
        <p className="text-white/50">Loading companies...</p>
      ) : (
      <div className="grid md:grid-cols-3 gap-6">

        {companies.length === 0 ? (
          <p className="text-white/50">No companies registered.</p>
        ) : (
          companies.map((company, index) => (
            <div
              key={company.id ?? index}
              className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition"
            >
              <div className="flex justify-between items-start">
                <h2 className="text-xl font-semibold">{company.name}</h2>
                <span
                  className={`text-xs px-3 py-1 rounded-full font-medium ${
                    company.approved
                      ? "bg-green-500/20 text-green-400"
                      : "bg-yellow-500/20 text-yellow-400"
                  }`}
                >
                  {company.approved ? "Approved" : "Pending"}
                </span>
              </div>

              {company.industry && (
                <p className="text-white/60 mt-2">🏭 {company.industry}</p>
              )}
              {company.location && (
                <p className="text-white/60 mt-2">📍 {company.location}</p>
              )}
              {company.size && (
                <p className="text-white/60 mt-2">👥 {company.size}</p>
              )}
              {company.website && (
                <p className="text-white/60 mt-2 truncate">🌐 {company.website}</p>
              )}

              <Button
                size="sm"
                className="mt-4"
                disabled={currentId === company.id}
                onClick={() => toggleApproval(company)}
              >
                {currentId === company.id
                  ? "..."
                  : company.approved
                  ? "Revoke Approval"
                  : "Approve Company"}
              </Button>
            </div>
          ))
        )}

      </div>
      )}

    </div>
  );
}
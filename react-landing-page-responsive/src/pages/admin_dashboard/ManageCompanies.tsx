import { useState } from "react";
import { Button } from "@/components/ui/button";
import CompanyDrawer, { Company } from "./CompanyDrawer";

export default function ManageCompanies(): JSX.Element {
const companies: Company[] = [
{ name: "TechNova", email: "[hr@technova.com](mailto:hr@technova.com)", jobs: 12, status: "Approved", reports: 0 },
{ name: "ByteCraft", email: "[careers@bytecraft.io](mailto:careers@bytecraft.io)", jobs: 6, status: "Pending", reports: 1 },
{ name: "NextGen Labs", email: "[jobs@nextgenlabs.ai](mailto:jobs@nextgenlabs.ai)", jobs: 3, status: "Suspended", reports: 3 },
];

const [selected, setSelected] = useState<Company | null>(null);

return ( <div className="space-y-8">

```
  {/* Header */}
  <div className="flex items-center justify-between">
    <h1 className="text-3xl font-bold">Manage Companies</h1>

    <input
      placeholder="Search companies..."
      className="px-4 py-2 rounded-xl border border-slate-200 bg-white shadow-sm
      dark:bg-white/5 dark:border-white/10 outline-none text-sm"
    />
  </div>

  {/* Table */}
  <div className="rounded-3xl overflow-hidden border
  bg-white shadow-lg border-slate-200
  dark:bg-white/5 dark:border-white/10 dark:backdrop-blur-xl">

    <table className="w-full text-sm">
      <thead className="bg-slate-50 text-slate-500 uppercase text-xs
      dark:bg-white/10 dark:text-white/60">
        <tr>
          <th className="p-4 text-left">Company</th>
          <th>Email</th>
          <th>Active Jobs</th>
          <th>Status</th>
          <th>Reports</th>
          <th className="text-right pr-6">Actions</th>
        </tr>
      </thead>

      <tbody>
        {companies.map((c, index) => (
          <tr
            key={index}
            className="border-t border-slate-200 hover:bg-slate-50
            dark:border-white/10 dark:hover:bg-white/5 transition"
          >
            <td className="p-4 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-cyan-500 text-white flex items-center justify-center text-xs font-semibold">
                {c.name[0]}
              </div>
              <span className="font-medium">{c.name}</span>
            </td>

            <td className="opacity-70">{c.email}</td>
            <td>{c.jobs}</td>
            <td>{c.status}</td>
            <td>{c.reports}</td>

            <td className="text-right pr-6 space-x-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => setSelected(c)}
              >
                View
              </Button>

              <Button size="sm" className="bg-green-500 text-white">
                Approve
              </Button>

              <Button size="sm" className="bg-red-500 text-white">
                Suspend
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>

  {/* Drawer */}
  <CompanyDrawer company={selected} onClose={() => setSelected(null)} />
</div>


);
}

import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

/* ---------- Types ---------- */
export type Company = {
name: string;
email: string;
jobs: number;
status: "Approved" | "Pending" | "Suspended";
reports: number;
};

interface Props {
company: Company | null;
onClose: () => void;
}

export default function CompanyDrawer({ company, onClose }: Props) {
return ( <AnimatePresence>
{company && (
<>
{/* Backdrop */}
<motion.div
className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
exit={{ opacity: 0 }}
onClick={onClose}
/>


      {/* Drawer */}
      <motion.div
        className="fixed right-0 top-0 h-full w-[420px]
        bg-white dark:bg-[#0f172a]
        border-l border-slate-200 dark:border-white/10
        z-50 p-6 overflow-y-auto"
        initial={{ x: 420 }}
        animate={{ x: 0 }}
        exit={{ x: 420 }}
        transition={{ type: "spring", stiffness: 260, damping: 30 }}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">{company.name}</h2>

          <button
            onClick={onClose}
            className="text-sm opacity-60 hover:opacity-100"
          >
            Close
          </button>
        </div>

        {/* Details */}
        <div className="space-y-4 text-sm">
          <div>
            <p className="opacity-60">Email</p>
            <p className="font-medium">{company.email}</p>
          </div>

          <div>
            <p className="opacity-60">Active Jobs</p>
            <p className="font-medium">{company.jobs}</p>
          </div>

          <div>
            <p className="opacity-60">Status</p>
            <p className="font-medium">{company.status}</p>
          </div>

          <div>
            <p className="opacity-60">Reports</p>
            <p className="font-medium">{company.reports}</p>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-8 flex gap-3">
          <Button className="bg-green-500 hover:bg-green-600 text-white">
            Approve
          </Button>

          <Button className="bg-red-500 hover:bg-red-600 text-white">
            Suspend
          </Button>
        </div>
      </motion.div>
    </>
  )}
</AnimatePresence>


);
}

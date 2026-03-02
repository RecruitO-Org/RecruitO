import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

export type Job = {
title: string;
company: string;
applications: number;
status: "Active" | "Closed" | "Flagged";
description: string;
skills: string[];
};

interface Props {
job: Job | null;
onClose: () => void;
}

export default function JobDrawer({ job, onClose }: Props) {
return ( <AnimatePresence>
{job && (
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
        <div className="flex justify-between mb-6">
          <h2 className="text-xl font-bold">{job.title}</h2>
          <button onClick={onClose} className="opacity-60 hover:opacity-100">
            Close
          </button>
        </div>

        {/* Info */}
        <div className="space-y-4 text-sm">
          <p><b>Company:</b> {job.company}</p>
          <p><b>Applications:</b> {job.applications}</p>
          <p><b>Status:</b> {job.status}</p>

          <div>
            <p className="opacity-60 mb-1">Description</p>
            <p>{job.description}</p>
          </div>

          <div>
            <p className="opacity-60 mb-1">Skills Required</p>
            <div className="flex flex-wrap gap-2">
              {job.skills.map((s, i) => (
                <span
                  key={i}
                  className="px-2 py-1 rounded-full text-xs
                  bg-violet-100 text-violet-700
                  dark:bg-violet-500/20 dark:text-violet-300"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-8 flex gap-3">
          <Button className="bg-orange-500 text-white">Flag</Button>
          <Button className="bg-gray-500 text-white">Close Job</Button>
          <Button className="bg-red-500 text-white">Delete</Button>
        </div>
      </motion.div>
    </>
  )}
</AnimatePresence>


);
}

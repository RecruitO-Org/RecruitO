import { Button } from "@/components/ui/button";

export default function Interviews() {
  return (
    <div className="max-w-6xl space-y-8">

      {/* HEADER */}
      <div>
        <h1 className="text-4xl font-bold mb-2">Interviews</h1>
        <p className="text-white/50">
          Manage your upcoming and past interviews
        </p>
      </div>

      {/* UPCOMING INTERVIEWS */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-green-900/40 to-emerald-800/30 border border-white/10 shadow-2xl">

        <h2 className="text-xl font-semibold mb-6">Upcoming</h2>

        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 flex justify-between items-center">

          <div>
            <p className="text-lg font-semibold">Frontend Developer</p>
            <p className="text-white/50">TechNova</p>
            <p className="text-sm text-white/40 mt-1">
              18 Feb • 11:00 AM • Google Meet
            </p>
          </div>

          <div className="flex gap-3">
            <Button variant="secondary">Reschedule</Button>
            <Button>Join</Button>
          </div>

        </div>
      </div>

      {/* PAST INTERVIEWS */}
      <div className="p-8 rounded-3xl bg-white/5 border border-white/10 shadow-xl">

        <h2 className="text-xl font-semibold mb-6">Past Interviews</h2>

        <div className="space-y-4">

          <div className="p-5 rounded-2xl bg-white/5 border border-white/10 flex justify-between">
            <div>
              <p className="font-medium">React Developer</p>
              <p className="text-sm text-white/50">CodeCraft</p>
            </div>
            <span className="text-green-400 font-medium">Selected ✓</span>
          </div>

          <div className="p-5 rounded-2xl bg-white/5 border border-white/10 flex justify-between">
            <div>
              <p className="font-medium">UI Developer</p>
              <p className="text-sm text-white/50">Designify</p>
            </div>
            <span className="text-red-400 font-medium">Rejected</span>
          </div>

        </div>

      </div>

    </div>
  );
}
import { Button } from "@/components/ui/button";

export default function Resume() {
  return (
    <div className="max-w-7xl mx-auto px-4 space-y-14">

      {/* HEADER */}
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6">

        <div>
          <h1 className="text-5xl font-bold tracking-tight">
            Resume Management
          </h1>
          <p className="text-white/50 mt-3 text-lg">
            Optimize your resume to increase interview chances 🚀
          </p>
        </div>

        {/* Floating ATS Badge */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-blue-600 blur-2xl opacity-30 rounded-3xl"></div>

          <div className="relative px-8 py-6 rounded-3xl bg-[#111827] border border-white/10 shadow-2xl">
            <p className="text-sm text-white/60 mb-1">ATS Compatibility</p>
            <p className="text-4xl font-bold bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
              78%
            </p>
          </div>
        </div>

      </div>

      {/* MAIN GRID */}
      <div className="grid lg:grid-cols-3 gap-12">

        {/* LEFT SIDE */}
        <div className="lg:col-span-2 space-y-10">

          {/* CURRENT RESUME CARD */}
          <div className="p-10 rounded-3xl bg-gradient-to-br from-[#0f172a] to-[#111827] border border-white/10 shadow-2xl">

            <div className="flex justify-between items-center mb-8">

              <div>
                <h2 className="text-2xl font-semibold">
                  Current Resume
                </h2>
                <p className="text-white/40 text-sm mt-1">
                  Last analyzed 3 days ago
                </p>
              </div>

              <span className="px-4 py-1 text-xs rounded-full bg-green-500/20 text-green-400 border border-green-500/30">
                Optimized • v2
              </span>

            </div>

            <div className="flex justify-between items-center p-6 rounded-2xl bg-[#1f2937]">

              <div>
                <p className="text-lg font-medium">
                  resume_v2.pdf
                </p>
                <p className="text-sm text-white/40">
                  245 KB • PDF Format
                </p>
              </div>

              <div className="flex gap-4">
                <Button variant="outline">
                  Preview
                </Button>

                <Button className="bg-gradient-to-r from-violet-600 to-blue-600 shadow-lg hover:scale-[1.03] transition-all">
                  Upload New
                </Button>
              </div>

            </div>

          </div>

          {/* PERFORMANCE SECTION */}
          <div className="p-10 rounded-3xl bg-[#111827] border border-white/10 shadow-2xl space-y-8">

            <h2 className="text-2xl font-semibold">
              Resume Performance Breakdown
            </h2>

            {[
              { label: "Keyword Match", value: 72 },
              { label: "Formatting", value: 85 },
              { label: "Impact Score", value: 65 },
              { label: "Recruiter Readability", value: 80 },
            ].map((item, index) => (
              <div key={index} className="space-y-2">

                <div className="flex justify-between text-sm">
                  <span className="text-white/70">
                    {item.label}
                  </span>
                  <span className="text-white/40">
                    {item.value}%
                  </span>
                </div>

                <div className="w-full h-3 bg-[#1f2937] rounded-full overflow-hidden">
                  <div
                    className="h-3 rounded-full bg-gradient-to-r from-violet-600 to-blue-600 transition-all duration-700"
                    style={{ width: `${item.value}%` }}
                  />
                </div>

              </div>
            ))}

            <Button className="w-full mt-6 py-4 text-lg bg-gradient-to-r from-violet-600 to-blue-600 shadow-xl hover:scale-[1.02] transition">
              Reanalyze Resume
            </Button>

          </div>

        </div>

        {/* RIGHT SIDEBAR */}
        <div className="space-y-10">

          {/* AI SUGGESTIONS */}
          <div className="p-8 rounded-3xl bg-[#111827] border border-white/10 shadow-2xl space-y-6">

            <h2 className="text-xl font-semibold">
              AI Suggestions
            </h2>

            {[
              "Add measurable achievements with numbers",
              "Include React, TypeScript & REST API keywords",
              "Add 3–4 line professional summary",
              "Move technical skills above experience",
            ].map((tip, index) => (
              <div
                key={index}
                className="p-4 rounded-xl bg-[#1f2937] text-sm text-white/60 hover:bg-[#273549] transition"
              >
                • {tip}
              </div>
            ))}

          </div>

          {/* VERSION HISTORY */}
          <div className="p-8 rounded-3xl bg-[#111827] border border-white/10 shadow-2xl space-y-6">

            <h2 className="text-xl font-semibold">
              Version History
            </h2>

            {[
              { name: "resume_v2.pdf", time: "3 days ago" },
              { name: "resume_v1.pdf", time: "2 weeks ago" },
            ].map((file, index) => (
              <div
                key={index}
                className="flex justify-between items-center p-3 rounded-xl hover:bg-[#1f2937] transition text-sm text-white/60"
              >
                <span>{file.name}</span>
                <span>{file.time}</span>
              </div>
            ))}

          </div>

        </div>

      </div>

    </div>
  );
}
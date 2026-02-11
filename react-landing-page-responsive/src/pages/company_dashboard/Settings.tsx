import { useState, ReactNode } from "react";
import CompanyLayout from "./CompanyLayout";

type TabType =
  | "Interview"
  | "AI"
  | "Workflow"
  | "Notifications"
  | "Security";

export default function Settings(): JSX.Element {
  const [activeTab, setActiveTab] = useState<TabType>("Interview");

  return (
    <CompanyLayout>
      <div className="p-6 max-w-5xl text-gray-900 dark:text-white">
        <h1 className="text-2xl font-bold mb-8">Settings</h1>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-gray-300 dark:border-gray-800 pb-3 overflow-x-auto">
          {(["Interview", "AI", "Workflow", "Notifications", "Security"] as TabType[]).map(
            (tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                  activeTab === tab
                    ? "bg-indigo-600 text-white"
                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800"
                }`}
              >
                {tab}
              </button>
            )
          )}
        </div>

        {activeTab === "Interview" && <InterviewSettings />}
        {activeTab === "AI" && <AISettings />}
        {activeTab === "Workflow" && <WorkflowSettings />}
        {activeTab === "Notifications" && <NotificationSettings />}
        {activeTab === "Security" && <SecuritySettings />}
      </div>
    </CompanyLayout>
  );
}

/* -------------------- INTERVIEW SETTINGS -------------------- */

function InterviewSettings(): JSX.Element {
  const [maxWarnings, setMaxWarnings] = useState<number>(3);
  const [duration, setDuration] = useState<number>(30);
  const [autoTerminate, setAutoTerminate] = useState<boolean>(true);

  return (
    <SettingsCard title="Interview Controls">
      <SettingInput
        label="Max Allowed Warnings"
        value={maxWarnings}
        onChange={setMaxWarnings}
      />
      <SettingInput
        label="Default Interview Duration (minutes)"
        value={duration}
        onChange={setDuration}
      />
      <SettingToggle
        label="Auto-terminate after max warnings"
        value={autoTerminate}
        onChange={setAutoTerminate}
      />
    </SettingsCard>
  );
}

/* -------------------- AI SETTINGS -------------------- */

function AISettings(): JSX.Element {
  const [minScore, setMinScore] = useState<number>(6);
  const [mode, setMode] = useState<string>("Balanced");

  return (
    <SettingsCard title="AI Configuration">
      <SettingInput
        label="Minimum Passing Score"
        value={minScore}
        onChange={setMinScore}
      />

      <div>
        <label className="block text-sm mb-2 text-gray-600 dark:text-gray-400">
          Evaluation Mode
        </label>
        <select
          value={mode}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setMode(e.target.value)
          }
          className="
            w-full px-4 py-2.5 rounded-xl border
            bg-gray-100 text-gray-900
            dark:bg-gray-800 dark:text-white
            border-gray-300 dark:border-gray-700
            focus:outline-none focus:ring-2 focus:ring-indigo-500
          "
        >
          <option value="Balanced">Balanced</option>
          <option value="Technical Focused">Technical Focused</option>
          <option value="Communication Focused">
            Communication Focused
          </option>
        </select>
      </div>
    </SettingsCard>
  );
}

/* -------------------- WORKFLOW SETTINGS -------------------- */

function WorkflowSettings(): JSX.Element {
  const [stages, setStages] = useState<string[]>([
    "Applied",
    "Shortlisted",
    "Interview",
    "Hired",
  ]);

  const addStage = (): void => {
    setStages([...stages, `Stage ${stages.length + 1}`]);
  };

  const updateStage = (index: number, value: string): void => {
    const updated = [...stages];
    updated[index] = value;
    setStages(updated);
  };

  return (
    <SettingsCard title="Hiring Workflow">
      <div className="space-y-3">
        {stages.map((stage, index) => (
          <input
            key={index}
            value={stage}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              updateStage(index, e.target.value)
            }
            className="
              w-full px-4 py-2.5 rounded-xl border
              bg-gray-100 text-gray-900
              dark:bg-gray-800 dark:text-white
              border-gray-300 dark:border-gray-700
              focus:outline-none focus:ring-2 focus:ring-indigo-500
            "
          />
        ))}
      </div>

      <button
        onClick={addStage}
        className="mt-4 text-indigo-600 dark:text-indigo-400 font-medium"
      >
        + Add Stage
      </button>
    </SettingsCard>
  );
}

/* -------------------- NOTIFICATIONS -------------------- */

function NotificationSettings(): JSX.Element {
  const [emailNewApplicants, setEmailNewApplicants] =
    useState<boolean>(true);
  const [emailFlagged, setEmailFlagged] = useState<boolean>(true);

  return (
    <SettingsCard title="Notification Preferences">
      <SettingToggle
        label="Email alerts for new applicants"
        value={emailNewApplicants}
        onChange={setEmailNewApplicants}
      />
      <SettingToggle
        label="Email alerts for flagged interviews"
        value={emailFlagged}
        onChange={setEmailFlagged}
      />
    </SettingsCard>
  );
}

/* -------------------- SECURITY -------------------- */

function SecuritySettings(): JSX.Element {
  const [twoFactor, setTwoFactor] = useState<boolean>(false);

  return (
    <SettingsCard title="Security">
      <SettingToggle
        label="Enable Two-Factor Authentication"
        value={twoFactor}
        onChange={setTwoFactor}
      />

      <button className="mt-6 text-red-500 font-medium">
        Delete Company Account
      </button>
    </SettingsCard>
  );
}

/* -------------------- REUSABLE COMPONENTS -------------------- */

interface SettingsCardProps {
  title: string;
  children: ReactNode;
}

function SettingsCard({
  title,
  children,
}: SettingsCardProps): JSX.Element {
  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 mb-8 text-gray-900 dark:text-white">
      <h2 className="text-lg font-semibold mb-6">{title}</h2>
      <div className="space-y-6">{children}</div>
    </div>
  );
}

interface SettingToggleProps {
  label: string;
  value: boolean;
  onChange: (v: boolean) => void;
}

function SettingToggle({
  label,
  value,
  onChange,
}: SettingToggleProps): JSX.Element {
  return (
    <div className="flex justify-between items-center">
      <span>{label}</span>
      <button
        onClick={() => onChange(!value)}
        className={`w-12 h-6 flex items-center rounded-full p-1 transition ${
          value ? "bg-indigo-600" : "bg-gray-400"
        }`}
      >
        <div
          className={`bg-white w-4 h-4 rounded-full shadow-md transform transition ${
            value ? "translate-x-6" : ""
          }`}
        />
      </button>
    </div>
  );
}

interface SettingInputProps {
  label: string;
  value: number;
  onChange: (v: number) => void;
}

function SettingInput({
  label,
  value,
  onChange,
}: SettingInputProps): JSX.Element {
  return (
    <div>
      <label className="block text-sm mb-2 text-gray-600 dark:text-gray-400">
        {label}
      </label>
      <input
        type="number"
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          onChange(Number(e.target.value))
        }
        className="
          w-full px-4 py-2.5 rounded-xl border
          bg-gray-100 text-gray-900
          dark:bg-gray-800 dark:text-white
          border-gray-300 dark:border-gray-700
          focus:outline-none focus:ring-2 focus:ring-indigo-500
        "
      />
    </div>
  );
}

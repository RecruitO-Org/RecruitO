import { ReactNode } from "react";

interface StatCardProps {
  title: string;
  value: number | string;
  icon: ReactNode;
  color?: string;
}

export default function StatCard({
  title,
  value,
  icon,
  color = "from-indigo-500 to-indigo-600",
}: StatCardProps) {
  return (
    <div
      className="
        relative
        bg-white dark:bg-gray-900
        rounded-2xl p-5
        border border-gray-200 dark:border-gray-800
        flex items-center justify-between
        transition-all duration-300
        hover:-translate-y-1
        hover:shadow-lg
        hover:shadow-indigo-500/10
      "
    >
      {/* Text */}
      <div>
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
          {title}
        </p>
        <h3 className="text-3xl font-bold text-gray-900 dark:text-white mt-1">
          {value}
        </h3>
      </div>

      {/* Icon */}
      <div
        className={`
          w-12 h-12 rounded-xl
          flex items-center justify-center
          bg-gradient-to-br ${color}
          text-white
          shadow-md
        `}
      >
        {icon}
      </div>
    </div>
  );
}

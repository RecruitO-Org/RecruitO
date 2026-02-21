import { Paragraph } from "../shared/Paragraph";

interface ServiceProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export const Service = ({ title, description, icon }: ServiceProps) => {
  return (
    <div
      className="
        group
        relative overflow-hidden
        p-6 sm:p-7 lg:p-8
        rounded-3xl
        border border-zinc-200 dark:border-zinc-800
        bg-white dark:bg-zinc-900/50
        backdrop-blur-sm
        transition-all duration-300 ease-out
        hover:-translate-y-2
        hover:shadow-2xl
        dark:hover:shadow-violet-500/20
      "
    >
      {/* Subtle gradient glow effect */}
      <div
        className="
          absolute inset-0 opacity-0 group-hover:opacity-100
          transition-opacity duration-500
          bg-gradient-to-br from-violet-500/5 to-blue-500/5
          dark:from-violet-500/10 dark:to-blue-500/10
          pointer-events-none
        "
      />

      {/* Icon */}
      <div
        className="
          relative z-10
          rounded-2xl
          bg-zinc-100 dark:bg-zinc-800
          p-4
          text-violet-600 dark:text-violet-400
          w-max
          transition-all duration-300
          group-hover:scale-110
        "
      >
        {icon}
      </div>

      {/* Content */}
      <div className="mt-6 space-y-4 relative z-10">
        <h2 className="text-lg md:text-xl font-semibold text-zinc-900 dark:text-white transition-colors duration-300 group-hover:text-violet-600 dark:group-hover:text-violet-400">
          {title}
        </h2>

        <Paragraph className="text-zinc-600 dark:text-zinc-400">
          {description}
        </Paragraph>
      </div>
    </div>
  );
};

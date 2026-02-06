import { Link } from "react-router-dom";

const SignIn = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4
      bg-gray-50 dark:bg-gradient-to-br dark:from-black dark:via-gray-900 dark:to-black"
    >
      <div
        className="w-full max-w-md rounded-2xl p-8 shadow-xl
        bg-white border border-gray-200
        dark:bg-white/5 dark:border-white/10 dark:backdrop-blur-xl"
      >
        {/* Heading */}
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white text-center">
          Welcome back
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-center mt-2">
          Sign In to your RecruitO account
        </p>

        {/* Form */}
        <form className="mt-8 space-y-5">
          {/* Email */}
          <div>
            <label className="block text-sm mb-1 text-gray-700 dark:text-gray-300">
              Email address
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full px-4 py-3 rounded-xl
              bg-white text-gray-900 placeholder-gray-400
              border border-gray-300
              focus:outline-none focus:ring-2 focus:ring-purple-500
              dark:bg-black/40 dark:text-white dark:border-white/10 dark:placeholder-gray-500"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm mb-1 text-gray-700 dark:text-gray-300">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl
              bg-white text-gray-900 placeholder-gray-400
              border border-gray-300
              focus:outline-none focus:ring-2 focus:ring-purple-500
              dark:bg-black/40 dark:text-white dark:border-white/10 dark:placeholder-gray-500"
            />
          </div>

          {/* Forgot password */}
          <div className="flex justify-end">
            <button
              type="button"
              className="text-sm text-purple-600 dark:text-purple-400 hover:underline"
            >
              Forgot password?
            </button>
          </div>

          {/* Login button */}
          <button
            type="submit"
            className="w-full py-3 rounded-xl font-semibold text-white
            bg-gradient-to-r from-purple-600 to-blue-600
            hover:opacity-90 transition"
          >
            Sign In
          </button>
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center">
          <div className="flex-1 h-px bg-gray-300 dark:bg-white/10" />
          <span className="px-3 text-sm text-gray-500 dark:text-gray-400">
            OR
          </span>
          <div className="flex-1 h-px bg-gray-300 dark:bg-white/10" />
        </div>

        {/* Signup link */}
        <p className="text-center text-sm text-gray-600 dark:text-gray-400">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-purple-600 dark:text-purple-400 font-medium hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;

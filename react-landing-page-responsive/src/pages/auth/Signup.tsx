import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validation
    if (!name || !email || !password) {
      setError("All fields are required");
      return;
    }

     // Validation: name should not contain digits
    if (/\d/.test(name)) {
      setError("Name should not contain numbers");
      return;
    }
    
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    // Clear error
    setError("");

    // Temporary success (backend later)
    console.log("Signup data:", { name, email, password });

    // Redirect after signup
    navigate("/dashboard");
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-body px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="
          w-full max-w-md
          bg-box-bg border border-box-border
          rounded-3xl p-8
          shadow-lg shadow-box-shadow
        "
      >
        {/* Title */}
        <h1 className="text-3xl font-bold text-heading-1 text-center">
          Create your account
        </h1>
        <p className="text-heading-3 text-center mt-2">
          Join RecruitO and start your journey
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          {/* Name */}
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="
              w-full px-5 py-3 rounded-xl
              bg-body border border-box-border
              text-heading-1
              placeholder:text-zinc-400
              outline-none
              focus:border-violet-500
            "
          />

          {/* Email */}
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="
              w-full px-5 py-3 rounded-xl
              bg-body border border-box-border
              text-heading-1
              placeholder:text-zinc-400
              outline-none
              focus:border-violet-500
            "
          />

          {/* Password */}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="
              w-full px-5 py-3 rounded-xl
              bg-body border border-box-border
              text-heading-1
              placeholder:text-zinc-400
              outline-none
              focus:border-violet-500
            "
          />

          {/* Error message */}
          {error && (
            <p className="text-sm text-red-500 text-center">
              {error}
            </p>
          )}

          {/* Submit */}
          <button
            type="submit"
            className="
              w-full py-3 rounded-full
              bg-gradient-to-r from-violet-600 to-blue-600
              text-white font-semibold
              transition-all duration-300
              hover:scale-105
              active:scale-95
              shadow-lg shadow-violet-600/30
            "
          >
            Sign Up
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-heading-3 mt-6">
          Already have an account?{" "}
          <Link
            to="/signin"
            className="text-violet-400 hover:text-violet-300 font-medium"
          >
            Sign In
          </Link>
        </p>
      </motion.div>
    </section>
  );
}

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

type Role = "user" | "company";

export default function Signup() {
  const navigate = useNavigate();
  const [role, setRole] = useState<Role>("user");

  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [fullName, setFullName] = useState("");
  const [otp, setOtp] = useState("");

  const [companyName, setCompanyName] = useState("");
  const [website, setWebsite] = useState("");
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [industry, setIndustry] = useState("");

  const [error, setError] = useState("");

  const [otpSent, setOtpSent] = useState(false);
  const [timer, setTimer] = useState(0);

  const isFreeEmail = (email: string) => {
    return /@(gmail|yahoo|outlook|hotmail)\.com$/i.test(email);
  };

  const startTimer = () => {
    setTimer(30);
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const sendOTP = async () => {
    if (!email) {
      setError("Enter email first");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/send-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.detail || "Failed to send OTP");
        return;
      }

      setOtpSent(true);
      startTimer();

    } catch {
      setError("Server error while sending OTP");
    }
  };

  const resendOTP = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/resend-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.detail || "Failed to resend OTP");
        return;
      }

      startTimer();

    } catch {
      setError("Server error while resending OTP");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !phone || !password || !confirmPassword) {
      setError("All required fields must be filled");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (role === "user") {
      if (!fullName || !otp) {
        setError("Please complete all candidate fields");
        return;
      }
    }

    if (role === "company") {
      if (!companyName || !website || !registrationNumber || !industry) {
        setError("All company fields are required");
        return;
      }

      if (isFreeEmail(email)) {
        setError("Use official company email (no Gmail/Yahoo)");
        return;
      }
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: role === "user" ? fullName : companyName,
          email,
          password,
          role,
          otp,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.detail || "Signup failed");
        return;
      }

      if (role === "user") {
        navigate("/dashboard");
      } else {
        navigate("/company/dashboard");
      }

    } catch {
      setError("Server error. Please try again.");
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#0a0f1f] px-4">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-lg backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-10 shadow-2xl"
      >
        <h1 className="text-4xl font-bold text-white text-center">
          Create your account
        </h1>

        {/* Toggle */}
        <div className="flex justify-center mt-8">
          <div className="relative bg-white/10 p-1 rounded-full flex w-72">
            <motion.div
              layout
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className="absolute top-1 bottom-1 w-1/2 rounded-full bg-gradient-to-r from-violet-600 to-blue-600"
              style={{ left: role === "user" ? "4px" : "50%" }}
            />

            <button
              type="button"
              onClick={() => setRole("user")}
              className={`relative z-10 w-1/2 py-2 text-sm ${
                role === "user" ? "text-white" : "text-white/70"
              }`}
            >
              Candidate
            </button>

            <button
              type="button"
              onClick={() => setRole("company")}
              className={`relative z-10 w-1/2 py-2 text-sm ${
                role === "company" ? "text-white" : "text-white/70"
              }`}
            >
              Company
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-10 space-y-6">

          <AnimatePresence mode="wait">
            {role === "user" && (
              <motion.div
                key="candidate"
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 40 }}
                transition={{ duration: 0.35 }}
                className="space-y-6"
              >
                <input
                  placeholder="Full Name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="inputStyle"
                />

                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="inputStyle"
                />
              </motion.div>
            )}

            {role === "company" && (
              <motion.div
                key="company"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.35 }}
                className="space-y-6"
              >
                <input placeholder="Company Name" value={companyName}
                  onChange={(e)=>setCompanyName(e.target.value)} className="inputStyle"/>

                <input type="email" placeholder="Official Company Email"
                  value={email} onChange={(e)=>setEmail(e.target.value)}
                  className="inputStyle"/>

                <input placeholder="Company Website" value={website}
                  onChange={(e)=>setWebsite(e.target.value)} className="inputStyle"/>

                <input placeholder="Registration Number"
                  value={registrationNumber}
                  onChange={(e)=>setRegistrationNumber(e.target.value)}
                  className="inputStyle"/>

                <input placeholder="Industry" value={industry}
                  onChange={(e)=>setIndustry(e.target.value)} className="inputStyle"/>
              </motion.div>
            )}
          </AnimatePresence>

          <input placeholder="Phone Number" value={phone}
            onChange={(e)=>setPhone(e.target.value)} className="inputStyle"/>

          <input type="password" placeholder="Password"
            value={password} onChange={(e)=>setPassword(e.target.value)}
            className="inputStyle"/>

          <input type="password" placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e)=>setConfirmPassword(e.target.value)}
            className="inputStyle"/>

          {role === "user" && (
            <div className="space-y-3">

              <div className="flex gap-3">
                <input
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e)=>setOtp(e.target.value)}
                  className="flex-1 inputStyle"
                />

                <button
                  type="button"
                  onClick={sendOTP}
                  className={`px-4 rounded-xl text-white text-sm ${
                    otpSent ? "bg-green-600" : "bg-violet-600"
                  }`}
                >
                  {otpSent ? "Sent" : "Send OTP"}
                </button>
              </div>

              <button
                type="button"
                disabled={timer > 0}
                onClick={resendOTP}
                className={`text-sm ${
                  timer > 0 ? "text-gray-500" : "text-violet-400"
                }`}
              >
                {timer > 0 ? `Resend OTP in ${timer}s` : "Resend OTP"}
              </button>

            </div>
          )}

          {error && (
            <p className="text-red-400 text-sm text-center">{error}</p>
          )}

          <button
            type="submit"
            className="w-full py-4 rounded-full bg-gradient-to-r from-violet-600 to-blue-600 text-white font-semibold hover:scale-105"
          >
            Sign Up
          </button>

        </form>

        <p className="text-center text-white/60 mt-8">
          Already have an account?{" "}
          <Link to="/signin" className="text-violet-400">
            Sign In
          </Link>
        </p>
      </motion.div>

      <style>{`
      .inputStyle {
        width: 100%;
        padding: 12px 20px;
        border-radius: 14px;
        background: rgba(255,255,255,0.05);
        border: 1px solid rgba(255,255,255,0.1);
        color: white;
        outline: none;
      }
      `}</style>
    </section>
  );
}
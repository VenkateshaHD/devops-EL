import { useEffect, useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import BorderAnimatedContainer from "../components/BorderAnimatedContainer";
import { MessageCircleIcon, MailIcon, LoaderIcon, LockIcon } from "lucide-react";
import { Link } from "react-router";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";


function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { login, isLoggingIn } = useAuthStore();
  const [showReset, setShowReset] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isOtpSending, setIsOtpSending] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData);
  };

  useEffect(() => {
    if (!showReset) return;
    setResetEmail(formData.email);
  }, [showReset, formData.email]);

  useEffect(() => {
    if (resendCooldown <= 0) return;
    const timer = setInterval(() => {
      setResendCooldown((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [resendCooldown]);

  const requestOtp = async () => {
    const emailRegex = /^[^\s@]+@gmail\.com$/i;
    if (!emailRegex.test(resetEmail)) {
      toast.error("Only valid Gmail addresses are allowed");
      return;
    }
    setIsOtpSending(true);
    try {
      await axiosInstance.post("/auth/request-otp", { email: resetEmail });
      toast.success("OTP sent to your email");
      setResendCooldown(60);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send OTP");
    } finally {
      setIsOtpSending(false);
    }
  };

  const resetPassword = async () => {
    if (!otp.trim()) {
      toast.error("OTP is required");
      return;
    }
    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    setIsResetting(true);
    try {
      await axiosInstance.post("/auth/reset-password", {
        email: resetEmail,
        otp,
        newPassword,
      });
      toast.success("Password updated");
      setOtp("");
      setNewPassword("");
      setConfirmPassword("");
      setShowReset(false);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to reset password");
    } finally {
      setIsResetting(false);
    }
  };

  return (
    <div className="w-full h-screen flex flex-col md:flex-row bg-black overflow-hidden">
      {/* LEFT: Login Form */}
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 px-6 py-12 h-full bg-[#050505]">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <MessageCircleIcon className="w-12 h-12 mx-auto text-red-500 mb-4" />
            <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
            <p className="text-[#9b9b9b]">Login to access your account</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="auth-input-label">Email</label>
              <div className="relative">
                <MailIcon className="auth-input-icon" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="input"
                  placeholder="johndoe@gmail.com"
                  autoComplete="username"
                />
              </div>
            </div>
            <div>
              <label className="auth-input-label">Password</label>
              <div className="relative">
                <LockIcon className="auth-input-icon" />
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="input"
                  placeholder="Enter your password"
                  autoComplete="current-password"
                />
              </div>
              <div className="mt-2 flex justify-end">
                <button
                  type="button"
                  onClick={() => setShowReset((prev) => !prev)}
                  className="text-xs text-red-400 hover:text-red-300"
                >
                  Forgot password?
                </button>
              </div>
            </div>
            <button className="auth-btn" type="submit" disabled={isLoggingIn}>
              {isLoggingIn ? (
                <LoaderIcon className="w-full h-5 animate-spin text-center" />
              ) : (
                "Sign In"
              )}
            </button>
          </form>
          {showReset && (
            <div className="mt-6 space-y-3 border-t border-[#1a1a1a] pt-4">
              <p className="text-sm text-[#9b9b9b]">Reset password via OTP</p>
              <input
                type="email"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                placeholder="yourname@gmail.com"
                className="w-full h-10 bg-[#131313] border border-[#1a1a1a] rounded-lg px-3 text-sm text-white placeholder-[#7a7a7a] focus:outline-none focus:ring-2 focus:ring-red-600"
              />
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter OTP"
                  className="flex-1 h-10 bg-[#131313] border border-[#1a1a1a] rounded-lg px-3 text-sm text-white placeholder-[#7a7a7a] focus:outline-none focus:ring-2 focus:ring-red-600"
                />
                <button
                  type="button"
                  onClick={requestOtp}
                  disabled={isOtpSending || resendCooldown > 0}
                  className="h-10 px-3 rounded-lg bg-[#151515] text-white text-xs hover:bg-[#1f1f1f] disabled:opacity-60"
                >
                  {resendCooldown > 0 ? `Resend ${resendCooldown}s` : "Send OTP"}
                </button>
              </div>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="New password"
                className="w-full h-10 bg-[#131313] border border-[#1a1a1a] rounded-lg px-3 text-sm text-white placeholder-[#7a7a7a] focus:outline-none focus:ring-2 focus:ring-red-600"
              />
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm password"
                className="w-full h-10 bg-[#131313] border border-[#1a1a1a] rounded-lg px-3 text-sm text-white placeholder-[#7a7a7a] focus:outline-none focus:ring-2 focus:ring-red-600"
              />
              <div className="flex items-center justify-end">
                <button
                  type="button"
                  onClick={resetPassword}
                  disabled={isResetting}
                  className="h-10 px-4 rounded-lg bg-[#e50914] text-white text-sm font-medium hover:bg-[#ff1f2b] disabled:opacity-60"
                >
                  Update password
                </button>
              </div>
            </div>
          )}
          <div className="mt-6 text-center">
            <Link to="/signup" className="auth-link">
              Don't have an account? Sign Up
            </Link>
          </div>
        </div>
      </div>
      {/* RIGHT: Illustration */}
      <div className="hidden md:flex flex-col justify-center items-center w-1/2 bg-gradient-to-br from-[#1a0003] via-[#0a0a0a] to-black p-12 h-full">
        <img
          src="/login.png"
          alt="People using mobile devices"
          className="w-full h-auto object-contain max-w-lg"
        />
        <div className="mt-6 text-center">
          <h3 className="text-xl font-medium text-red-500">Connect anytime, anywhere</h3>
          <div className="mt-4 flex justify-center gap-4">
            <span className="auth-badge">Free</span>
            <span className="auth-badge">Easy Setup</span>
            <span className="auth-badge">Private</span>
          </div>
        </div>
      </div>
    </div>
  );
}
export default LoginPage;

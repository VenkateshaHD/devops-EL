import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import BorderAnimatedContainer from "../components/BorderAnimatedContainer";
import { MessageCircleIcon, LockIcon, MailIcon, UserIcon, LoaderIcon } from "lucide-react";
import { Link } from "react-router";

function SignUpPage() {
  const [formData, setFormData] = useState({ fullName: "", email: "", password: "" });
  const { signup, isSigningUp } = useAuthStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(formData);
  };

  return (
    <div className="w-full h-screen flex flex-col md:flex-row bg-black overflow-hidden">
      {/* LEFT: Sign Up Form */}
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 px-6 py-12 h-full bg-[#050505]">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <MessageCircleIcon className="w-12 h-12 mx-auto text-red-500 mb-4" />
            <h2 className="text-3xl font-bold text-white mb-2">Create Account</h2>
            <p className="text-[#9b9b9b]">Sign up for a new account</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="auth-input-label">Full Name</label>
              <div className="relative">
                <UserIcon className="auth-input-icon" />
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="input"
                  placeholder="John Doe"
                />
              </div>
            </div>
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
                />
              </div>
            </div>
            <button className="auth-btn" type="submit" disabled={isSigningUp}>
              {isSigningUp ? (
                <LoaderIcon className="w-full h-5 animate-spin text-center" />
              ) : (
                "Create Account"
              )}
            </button>
          </form>
          <div className="mt-6 text-center">
            <Link to="/login" className="auth-link">
              Already have an account? Login
            </Link>
          </div>
        </div>
      </div>
      {/* RIGHT: Illustration */}
      <div className="hidden md:flex flex-col justify-center items-center w-1/2 bg-gradient-to-br from-[#1a0003] via-[#0a0a0a] to-black p-12 h-full">
        <img
          src="/signup.png"
          alt="People using mobile devices"
          className="w-full h-auto object-contain max-w-lg"
        />
        <div className="mt-6 text-center">
          <h3 className="text-xl font-medium text-red-500">Start Your Journey Today</h3>
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
export default SignUpPage;

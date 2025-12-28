import { Navigate, Route, Routes } from "react-router";
import ChatPage from "./pages/ChatPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";
import PageLoader from "./components/PageLoader";

import { Toaster } from "react-hot-toast";

function App() {
  const { checkAuth, isCheckingAuth, authUser } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) return <PageLoader />;

  return (
    <div className="min-h-screen bg-black relative flex items-center justify-center overflow-hidden">
      {/* Red glow accents */}
      <div className="pointer-events-none absolute -left-24 -top-24 size-[360px] bg-red-900 blur-[140px] opacity-40" />
      <div className="pointer-events-none absolute -right-24 bottom-10 size-[320px] bg-red-700 blur-[120px] opacity-30" />

      <Routes>
        <Route path="/" element={authUser ? <ChatPage /> : <Navigate to={"/login"} />} />
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to={"/"} />} />
        <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to={"/"} />} />
        <Route path="/settings" element={authUser ? <ChatPage /> : <Navigate to={"/login"} />} />
      </Routes>

      <Toaster />
    </div>
  );
}
export default App;

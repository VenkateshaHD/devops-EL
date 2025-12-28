import { Search, Monitor, KeyRound, Lock, MessageSquare, Video, Bell, Keyboard, HelpCircle } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import AppSidebar from "../components/AppSidebar";

const SETTINGS_ITEMS = [
  {
    title: "General",
    subtitle: "Startup and close",
    icon: Monitor,
  },
  {
    title: "Account",
    subtitle: "Security notifications, account info",
    icon: KeyRound,
  },
  {
    title: "Privacy",
    subtitle: "Blocked contacts, disappearing messages",
    icon: Lock,
  },
  {
    title: "Chats",
    subtitle: "Theme, wallpaper, chat settings",
    icon: MessageSquare,
  },
  {
    title: "Video & voice",
    subtitle: "Camera, microphone & speakers",
    icon: Video,
  },
  {
    title: "Notifications",
    subtitle: "Message notifications",
    icon: Bell,
  },
  {
    title: "Keyboard shortcuts",
    subtitle: "Quick actions",
    icon: Keyboard,
  },
  {
    title: "Help and feedback",
    subtitle: "Help centre, contact us, privacy policy",
    icon: HelpCircle,
  },
];

function SettingsPage() {
  const { authUser } = useAuthStore();

  return (
    <div className="w-full h-screen bg-black flex">
      <AppSidebar />
      <div className="w-full md:max-w-[480px] h-full border-r border-[#1a1a1a] bg-[#0c0c0c] flex flex-col ml-0 md:ml-[76px]">
        <div className="h-16 px-6 flex items-center border-b border-[#1a1a1a]">
          <h1 className="text-2xl font-semibold text-white">Settings</h1>
        </div>

        <div className="px-6 py-4 border-b border-[#1a1a1a]">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9b9b9b]" />
            <input
              type="text"
              placeholder="Search settings"
              className="w-full h-11 bg-[#131313] border border-[#e50914] rounded-full pl-11 pr-4 text-sm text-white placeholder-[#7a7a7a] focus:outline-none focus:ring-2 focus:ring-red-600"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar px-6 py-4 space-y-4 pb-20 md:pb-4">
          <button className="w-full flex items-center gap-4 text-left pb-4 border-b border-[#1a1a1a]">
            <img
              src={authUser?.profilePic || "/avatar.png"}
              alt={authUser?.fullName || "Profile"}
              className="w-14 h-14 rounded-full object-cover"
            />
            <div className="flex-1 min-w-0">
              <p className="text-white font-medium text-base truncate">
                {authUser?.fullName || "Your profile"}
              </p>
              <p className="text-[#9b9b9b] text-sm truncate">Set your status</p>
            </div>
          </button>

          <div className="space-y-1">
            {SETTINGS_ITEMS.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.title}
                  className="w-full flex items-center gap-4 py-3 text-left rounded-lg hover:bg-[#151515] transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#131313] border border-[#1a1a1a] flex items-center justify-center">
                    <Icon className="w-5 h-5 text-[#b0b0b0]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-medium text-[15px]">{item.title}</p>
                    <p className="text-[#8a8a8a] text-sm truncate">{item.subtitle}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="hidden md:flex flex-1 items-center justify-center bg-black">
        <div className="text-center text-[#7a7a7a]">
          <p className="text-sm">Select a settings option</p>
        </div>
      </div>
    </div>
  );
}

export default SettingsPage;

import { XIcon, PhoneIcon, VideoIcon, MoreVerticalIcon, ArrowLeft } from "lucide-react";
import { useChatStore } from "../store/useChatStore";
import { useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";

function ChatHeader() {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  const isGroup = selectedUser.admin !== undefined;
  const isOnline = !isGroup && onlineUsers.includes(selectedUser._id);
  const name = isGroup ? selectedUser.name : selectedUser.fullName;
  const status = isGroup ? `${selectedUser.members?.length || 0} members` : isOnline ? "Online" : "Offline";

  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === "Escape") setSelectedUser(null);
    };

    window.addEventListener("keydown", handleEscKey);

    // cleanup function
    return () => window.removeEventListener("keydown", handleEscKey);
  }, [setSelectedUser]);

  return (
    <div className="flex justify-between items-center bg-[#0f0f0f]/90 border-b border-[#1a1a1a] px-4 md:px-6 h-16 shadow-md flex-shrink-0">
      <div className="flex items-center gap-3 md:gap-4 h-full">
        {/* Mobile: Back Button */}
        <button className="md:hidden text-[#7a7a7a] hover:text-white" onClick={() => setSelectedUser(null)}>
          <ArrowLeft className="w-6 h-6" />
        </button>

        <div className={`avatar ${isOnline ? "online" : ""}`}>
          <div className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-[#1f1f1f]">
            <img src={selectedUser.profilePic || "/avatar.png"} alt={name} className="w-full h-full object-cover rounded-full" />
          </div>
        </div>
        <div>
          <h3 className="text-white font-medium text-sm md:text-base leading-tight">{name}</h3>
          <p className={`text-[10px] md:text-xs ${isOnline ? "text-red-400" : "text-[#7a7a7a]"}`}>{status}</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button onClick={() => setSelectedUser(null)} className="text-[#8a8a8a] hover:text-red-500 transition-colors" title="Close Chat">
          <XIcon className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
export default ChatHeader;

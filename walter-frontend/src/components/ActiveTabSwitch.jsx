import { useChatStore } from "../store/useChatStore";

function ActiveTabSwitch() {
  const { activeTab, chatFilter, setChatFilter } = useChatStore();

  // Only show tabs for chats
  if (activeTab !== "chats") return null;

  return (
    <div className="flex gap-2 items-center flex-nowrap">
      <button
        onClick={() => setChatFilter("all")}
        className={`px-3 h-9 flex items-center justify-center rounded-full text-sm font-medium leading-none transition-all ${chatFilter === "all"
            ? "bg-[#e50914] text-white shadow-[0_0_0_1px_rgba(229,9,20,0.4)]"
            : "bg-[#131313] text-[#9b9b9b] hover:bg-[#1a1a1a]"
          }`}
        aria-pressed={chatFilter === "all"}
      >
        All
      </button>
      <button
        onClick={() => setChatFilter("unread")}
        className={`px-3 h-9 flex items-center justify-center rounded-full text-sm font-medium leading-none transition-all ${chatFilter === "unread"
            ? "bg-[#e50914] text-white shadow-[0_0_0_1px_rgba(229,9,20,0.4)]"
            : "bg-[#131313] text-[#9b9b9b] hover:bg-[#1a1a1a]"
          }`}
        aria-pressed={chatFilter === "unread"}
      >
        Unread
      </button>
      <button
        onClick={() => setChatFilter("groups")}
        className={`px-3 h-9 flex items-center justify-center rounded-full text-sm font-medium leading-none transition-all ${chatFilter === "groups"
            ? "bg-[#e50914] text-white shadow-[0_0_0_1px_rgba(229,9,20,0.4)]"
            : "bg-[#131313] text-[#9b9b9b] hover:bg-[#1a1a1a]"
          }`}
        aria-pressed={chatFilter === "groups"}
      >
        Groups
      </button>
    </div>
  );
}

export default ActiveTabSwitch;

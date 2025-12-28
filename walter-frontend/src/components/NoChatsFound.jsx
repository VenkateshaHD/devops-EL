import { MessageCircleIcon } from "lucide-react";
import { useChatStore } from "../store/useChatStore";

function NoChatsFound() {
  const { setActiveTab } = useChatStore();

  return (
    <div className="flex flex-col items-center justify-center py-12 text-center space-y-6 bg-neutral-900 rounded-2xl shadow-2xl border border-neutral-800">
      <div className="w-16 h-16 bg-red-600/20 rounded-full flex items-center justify-center shadow animate-pulse">
        <MessageCircleIcon className="w-8 h-8 text-red-500" />
      </div>
      <div>
        <h4 className="text-white font-extrabold text-xl mb-2 tracking-tight">No conversations yet</h4>
        <p className="text-neutral-300 text-base px-6">
          Start a new chat by selecting a contact from the contacts tab
        </p>
      </div>
      <button
        onClick={() => setActiveTab("contacts")}
        className="px-7 py-2 text-base font-bold text-white bg-red-600 rounded-lg shadow-lg hover:bg-red-700 transition-all focus:outline-none focus:ring-2 focus:ring-red-400"
      >
        Find contacts
      </button>
    </div>
  );
}
export default NoChatsFound;

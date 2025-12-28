import { MessageCircleIcon } from "lucide-react";

const NoConversationPlaceholder = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-8 bg-neutral-900 rounded-2xl shadow-2xl border border-neutral-800">
      <div className="size-24 bg-red-600/20 rounded-full flex items-center justify-center mb-8 shadow-lg animate-pulse">
        <MessageCircleIcon className="size-12 text-red-500 drop-shadow-lg" />
      </div>
      <h3 className="text-2xl font-extrabold text-white mb-3 tracking-tight">Select a conversation</h3>
      <p className="text-neutral-300 max-w-lg text-base">
        Choose a contact from the sidebar to start chatting or continue a previous conversation.
      </p>
    </div>
  );
};

export default NoConversationPlaceholder;

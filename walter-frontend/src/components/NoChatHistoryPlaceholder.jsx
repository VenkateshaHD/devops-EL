import { MessageCircleIcon } from "lucide-react";

const NoChatHistoryPlaceholder = ({ name }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-8 bg-white/5 rounded-2xl shadow-xl backdrop-blur-md border border-white/10">
      <div className="w-20 h-20 bg-gradient-to-br from-red-500/20 to-red-400/10 rounded-full flex items-center justify-center mb-6 animate-pulse shadow-lg">
        <MessageCircleIcon className="size-10 text-red-400 drop-shadow-lg" />
      </div>
      <h3 className="text-xl font-bold text-white mb-3">
        Start your conversation with {name}
      </h3>
      <div className="h-px w-32 bg-gradient-to-r from-transparent via-red-500/30 to-transparent mx-auto"></div>
    </div>
  );
};

export default NoChatHistoryPlaceholder;

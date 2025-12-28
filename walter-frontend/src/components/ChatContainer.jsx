import { useEffect, useRef, useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import ChatHeader from "./ChatHeader";
import NoChatHistoryPlaceholder from "./NoChatHistoryPlaceholder";
import MessageInput from "./MessageInput";
import MessagesLoadingSkeleton from "./MessagesLoadingSkeleton";
import { Trash2 } from "lucide-react";

function ChatContainer() {
  const {
    selectedUser,
    getMessages,
    messages,
    isMessagesLoading,
    subscribeToMessages,
    unsubscribeFromMessages,
    deleteMessage,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);
  const [openDeleteId, setOpenDeleteId] = useState(null);

  useEffect(() => {
    getMessages(selectedUser._id);
    subscribeToMessages();

    // clean up
    return () => unsubscribeFromMessages();
  }, [selectedUser, getMessages, subscribeToMessages, unsubscribeFromMessages]);

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const isGroup = selectedUser.admin !== undefined;

  return (
    <>
      <ChatHeader />
      <div className="flex-1 px-4 md:px-6 overflow-y-auto py-6 md:py-8 bg-gradient-to-br from-black via-[#0c0c0c] to-[#1a0003]">
        {messages.length > 0 && !isMessagesLoading ? (
          <div className="max-w-4xl mx-auto space-y-6">
            {messages.map((msg) => (
              <div
                key={msg._id}
                className={`chat ${msg.senderId === authUser._id || msg.senderId?._id === authUser._id ? "chat-end" : "chat-start"}`}
              >
                {isGroup && (msg.senderId !== authUser._id && msg.senderId?._id !== authUser._id) && (
                  <div className="chat-header text-xs opacity-50 mb-1 ml-1 text-gray-300">
                    {msg.senderId?.fullName || "Unknown"}
                  </div>
                )}
                <div
                  className={`chat-bubble relative shadow-lg group ${msg.senderId === authUser._id || msg.senderId?._id === authUser._id
                      ? "bg-[#e50914] text-white rounded-2xl rounded-br-sm"
                      : "bg-[#131313] text-[#f1f1f1] rounded-2xl rounded-bl-sm border border-[#1f1f1f]"
                    }`}
                  style={{ maxWidth: '70%', wordBreak: 'break-word' }}
                >
                  <button
                    type="button"
                    onClick={() => setOpenDeleteId(openDeleteId === msg._id ? null : msg._id)}
                    className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[#0c0c0c] border border-[#1f1f1f] text-[#b0b0b0] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Delete"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                  {openDeleteId === msg._id && (
                    <div className="absolute top-6 right-0 z-20 bg-[#0f0f0f] border border-[#1a1a1a] rounded-lg shadow-lg p-2 flex flex-col gap-2 min-w-[140px]">
                      <button
                        type="button"
                        onClick={() => {
                          deleteMessage(msg._id, "me");
                          setOpenDeleteId(null);
                        }}
                        className="text-left text-xs text-white hover:text-red-400"
                      >
                        Delete for me
                      </button>
                      {(msg.senderId === authUser._id || msg.senderId?._id === authUser._id) && (
                        <button
                          type="button"
                          onClick={() => {
                            deleteMessage(msg._id, "all");
                            setOpenDeleteId(null);
                          }}
                          className="text-left text-xs text-white hover:text-red-400"
                        >
                          Delete for all
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => setOpenDeleteId(null)}
                        className="text-left text-xs text-[#9b9b9b] hover:text-white"
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                  {msg.image && (
                    <img src={msg.image} alt="Shared" className="rounded-lg h-48 object-cover" />
                  )}
                  {msg.audio && (
                    <audio controls className="mt-2 w-56">
                      <source src={msg.audio} />
                    </audio>
                  )}
                  {msg.fileUrl && (
                    <div className="mt-2 flex items-center justify-between gap-3 rounded-lg border border-[#1f1f1f] bg-[#0f0f0f] px-3 py-2">
                      <div className="min-w-0">
                        <p className="text-xs text-[#b0b0b0] truncate">
                          {msg.fileName || "Attachment"}
                        </p>
                        <p className="text-[10px] text-[#7a7a7a]">
                          {msg.fileType || "file"}
                        </p>
                      </div>
                      <a
                        href={msg.fileUrl}
                        download={msg.fileName || "download"}
                        className="text-xs text-white bg-[#e50914] px-3 py-1 rounded-full hover:bg-[#ff1f2b]"
                      >
                        Download
                      </a>
                    </div>
                  )}
                  {msg.text && <p className="mt-2 text-sm leading-relaxed">{msg.text}</p>}
                  <p className="text-[10px] mt-1 opacity-80 flex items-center gap-1 justify-end">
                    {new Date(msg.createdAt).toLocaleTimeString(undefined, {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            ))}
            {/* 👇 scroll target */}
            <div ref={messageEndRef} />
          </div>
        ) : isMessagesLoading ? (
          <MessagesLoadingSkeleton />
        ) : (
          <NoChatHistoryPlaceholder name={selectedUser.fullName} />
        )}
      </div>

      <MessageInput />
    </>
  );
}

export default ChatContainer;

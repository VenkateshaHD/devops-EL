import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import UsersLoadingSkeleton from "./UsersLoadingSkeleton";
import { useAuthStore } from "../store/useAuthStore";
import { SearchIcon } from "lucide-react";

function ContactList() {
  const {
    getAllContacts,
    allContacts,
    setSelectedUser,
    isUsersLoading,
    subscribeToContacts,
    unsubscribeFromContacts,
  } = useChatStore();
  const { onlineUsers, authUser } = useAuthStore();
  const [search, setSearch] = useState("");

  useEffect(() => {
    getAllContacts();
    subscribeToContacts();

    return () => unsubscribeFromContacts();
  }, [getAllContacts, subscribeToContacts, unsubscribeFromContacts]);

  if (isUsersLoading) return <UsersLoadingSkeleton />;

  const normalizedSearch = search.trim().toLowerCase();
  const filteredContacts = allContacts.filter((contact) => {
    if (!normalizedSearch) return true;
    const fullName = contact.fullName?.toLowerCase() || "";
    const username = contact.username?.toLowerCase() || "";
    return fullName.includes(normalizedSearch) || username.includes(normalizedSearch);
  });

  const sortedContacts = [...filteredContacts].sort((a, b) => {
    if (a._id === authUser?._id) return -1;
    if (b._id === authUser?._id) return 1;
    return a.fullName.localeCompare(b.fullName);
  });

  return (
    <div className="flex flex-col h-full bg-[#0c0c0c]">
      {/* Search bar */}
      <div className="px-4 pb-3 pt-2 bg-[#0c0c0c] sticky top-0 z-10">
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9b9b9b]" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search contacts"
            className="w-full bg-[#131313] text-[#f2f2f2] placeholder-[#7a7a7a] rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-red-600"
          />
        </div>
      </div>
      
      {/* Contacts list */}
      <div className="flex-1 overflow-y-auto">
        {sortedContacts.map((contact) => (
          <div
            key={contact._id}
            className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition-all border-b border-[#1a1a1a] ${
              contact._id === authUser?._id ? "bg-[#141414]" : "hover:bg-[#151515]"
            }`}
            onClick={() => setSelectedUser(contact)}
          >
            <div className={`avatar ${onlineUsers.includes(contact._id) ? "online" : "offline"}`}>
              <div className="w-12 h-12 rounded-full">
                <img src={contact.profilePic || "/avatar.png"} alt={contact.fullName} className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-[#f2f2f2] font-normal text-base truncate">
                {contact.fullName}
                {contact._id === authUser?._id && (
                  <span className="ml-2 text-xs text-[#e50914]">You</span>
                )}
              </h4>
              <p className="text-[#9b9b9b] text-sm truncate">
                {onlineUsers.includes(contact._id) ? "Online" : "Offline"}
              </p>
            </div>
            <div className="flex flex-col items-end gap-1">
              {onlineUsers.includes(contact._id) && (
                <span className="w-2 h-2 rounded-full bg-[#e50914]" />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default ContactList;

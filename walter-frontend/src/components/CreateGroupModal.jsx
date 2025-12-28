import { useState, useRef } from "react";
import { useChatStore } from "../store/useChatStore";
import { X, Camera, Check, Loader2, Search } from "lucide-react";
import toast from "react-hot-toast";

const CreateGroupModal = ({ isOpen, onClose }) => {
    const { allContacts, createGroup } = useChatStore();
    const [groupName, setGroupName] = useState("");
    const [selectedContacts, setSelectedContacts] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [image, setImage] = useState(null);
    const [isCreating, setIsCreating] = useState(false);
    const fileInputRef = useRef(null);

    if (!isOpen) return null;

    const filteredContacts = allContacts.filter((contact) =>
        contact.fullName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const toggleContact = (contactId) => {
        setSelectedContacts((prev) =>
            prev.includes(contactId)
                ? prev.filter((id) => id !== contactId)
                : [...prev, contactId]
        );
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!groupName.trim()) return toast.error("Group name is required");
        if (selectedContacts.length === 0) return toast.error("Select at least one member");

        setIsCreating(true);
        try {
            await createGroup({
                name: groupName,
                members: selectedContacts,
                profilePic: image,
            });
            onClose();
            // Reset form
            setGroupName("");
            setSelectedContacts([]);
            setImage(null);
        } catch (error) {
            console.error(error);
        } finally {
            setIsCreating(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-[#0c0c0c] w-full max-w-md rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] border border-[#1a1a1a]">
                {/* Header */}
                <div className="bg-[#131313] p-4 flex items-center justify-between border-b border-[#1a1a1a]">
                    <h2 className="text-[#e9edef] text-lg font-medium">New Group</h2>
                    <button onClick={onClose} className="text-[#aebac1] hover:text-[#e9edef]">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-6">
                    {/* Avatar Upload */}
                    <div className="flex justify-center">
                        <div className="relative">
                            <div
                                onClick={() => fileInputRef.current?.click()}
                                className="w-24 h-24 rounded-full bg-[#1a1a1a] flex items-center justify-center cursor-pointer overflow-hidden border-2 border-dashed border-[#3a3a3a] hover:border-[#e50914] transition"
                            >
                                {image ? (
                                    <img src={image} alt="Group" className="w-full h-full object-cover" />
                                ) : (
                                    <Camera className="w-8 h-8 text-[#aebac1]" />
                                )}
                            </div>
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleImageChange}
                                className="hidden"
                                accept="image/*"
                            />
                        </div>
                    </div>

                    {/* Group Name */}
                    <div>
                        <input
                            type="text"
                            placeholder="Group Subject"
                            value={groupName}
                            onChange={(e) => setGroupName(e.target.value)}
                            className="w-full bg-[#131313] text-[#f2f2f2] placeholder-[#7a7a7a] px-4 py-3 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#e50914] border border-[#1f1f1f]"
                        />
                    </div>

                    {/* Members Selection */}
                    <div className="space-y-3">
                        <h3 className="text-[#aebac1] text-sm font-medium uppercase">Select Members</h3>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9b9b9b]" />
                            <input
                                type="text"
                                placeholder="Search contacts..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-[#0f0f0f] text-[#f2f2f2] placeholder-[#7a7a7a] pl-10 pr-4 py-2 rounded-lg text-sm focus:outline-none border border-[#1a1a1a]"
                            />
                        </div>

                        <div className="space-y-2 max-h-48 overflow-y-auto custom-scrollbar">
                            {filteredContacts.map((contact) => (
                                <div
                                    key={contact._id}
                                    onClick={() => toggleContact(contact._id)}
                                    className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition ${selectedContacts.includes(contact._id) ? "bg-[#e50914]/10" : "hover:bg-[#141414]"
                                        }`}
                                >
                                    <div className="relative">
                                        <img
                                            src={contact.profilePic || "/avatar.png"}
                                            alt={contact.fullName}
                                            className="w-10 h-10 rounded-full object-cover"
                                        />
                                        {selectedContacts.includes(contact._id) && (
                                            <div className="absolute -bottom-1 -right-1 bg-[#e50914] rounded-full p-0.5 border-2 border-[#0f0f0f]">
                                                <Check className="w-3 h-3 text-white" />
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex-1">
                                        <h4 className={`font-medium ${selectedContacts.includes(contact._id) ? "text-[#e50914]" : "text-[#f2f2f2]"}`}>
                                            {contact.fullName}
                                        </h4>
                                    </div>
                                </div>
                            ))}

                            {filteredContacts.length === 0 && (
                                <p className="text-[#9b9b9b] text-center text-sm py-4">No contacts found</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-4 bg-[#0f0f0f] border-t border-[#1a1a1a] flex justify-end">
                    <button
                        onClick={handleSubmit}
                        disabled={isCreating}
                        className="bg-[#e50914] hover:bg-[#ff1f2b] text-white font-medium px-6 py-2 rounded-full flex items-center gap-2 transition disabled:opacity-50"
                    >
                        {isCreating ? <Loader2 className="w-5 h-5 animate-spin" /> : <Check className="w-5 h-5" />}
                        Create Group
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreateGroupModal;

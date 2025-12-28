import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketId, io } from "../lib/socket.js";
import Message from "../models/Message.js";
import User from "../models/User.js";

export const getAllContacts = async (req, res) => {
  try {
    const users = await User.find().select("-password");

    res.status(200).json(users);
  } catch (error) {
    console.log("Error in getAllContacts:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getMessagesByUserId = async (req, res) => {
  try {
    const myId = req.user._id;
    const { id: userToChatId } = req.params;

    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: myId },
      ],
      isDeleted: { $ne: true },
      deletedFor: { $nin: [myId] },
    }).sort({ createdAt: 1 });

    res.status(200).json(messages);
  } catch (error) {
    console.log("Error in getMessages controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { text, image, audio, file, fileName, fileType, isGroup } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    if (!text && !image && !audio && !file) {
      return res.status(400).json({ message: "Text, image, or audio is required." });
    }

    let imageUrl;
    if (file && fileType && fileType.startsWith("image/")) {
      const uploadResponse = await cloudinary.uploader.upload(file, {
        resource_type: "auto",
      });
      imageUrl = uploadResponse.secure_url;
    } else if (image) {
      // upload base64 image to cloudinary
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }

    let audioUrl;
    if (audio) {
      const uploadResponse = await cloudinary.uploader.upload(audio, {
        resource_type: "auto",
      });
      audioUrl = uploadResponse.secure_url;
    }

    let fileUrl;
    if (file && !(fileType && fileType.startsWith("image/"))) {
      const uploadResponse = await cloudinary.uploader.upload(file, {
        resource_type: "auto",
      });
      fileUrl = uploadResponse.secure_url;
    }

    let newMessage;

    if (isGroup) {
      // Handle Group Message
      // Verify user is member (optional but good practice)
      // For now, trust the isGroup flag and ID
      newMessage = new Message({
        senderId,
        groupId: receiverId, // receiverId is groupId here
        text,
        image: imageUrl,
        audio: audioUrl,
        fileUrl,
        fileName,
        fileType,
      });

      await newMessage.save();
      // Populate sender for realtime update
      await newMessage.populate("senderId", "fullName profilePic");

      // Emit to group room
      io.to(receiverId).emit("newMessage", newMessage);
    } else {
      // Handle Direct Message
      if (senderId.equals(receiverId)) {
        return res.status(400).json({ message: "Cannot send messages to yourself." });
      }
      const receiverExists = await User.exists({ _id: receiverId });
      if (!receiverExists) {
        return res.status(404).json({ message: "Receiver not found." });
      }

      newMessage = new Message({
        senderId,
        receiverId,
        text,
        image: imageUrl,
        audio: audioUrl,
        fileUrl,
        fileName,
        fileType,
      });

      await newMessage.save();

      const receiverSocketId = getReceiverSocketId(receiverId);
      if (receiverSocketId) {
        io.to(receiverSocketId).emit("newMessage", newMessage);
      }
    }

    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in sendMessage controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const markConversationSeen = async (req, res) => {
  try {
    const myId = req.user._id;
    const { id } = req.params;
    const { isGroup } = req.body;

    const now = new Date();
    const expireAt = new Date(now.getTime() + 2 * 60 * 60 * 1000);

    const filter = isGroup
      ? { groupId: id, senderId: { $ne: myId }, seenAt: null }
      : { senderId: id, receiverId: myId, seenAt: null };

    await Message.updateMany(filter, {
      $set: { seenAt: now, expireAt },
    });

    res.status(200).json({ message: "Marked as seen" });
  } catch (error) {
    console.log("Error in markConversationSeen controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteMessage = async (req, res) => {
  try {
    const myId = req.user._id;
    const { id } = req.params;
    const { scope } = req.body; // "me" | "all"

    if (!scope || (scope !== "me" && scope !== "all")) {
      return res.status(400).json({ message: "Invalid delete scope" });
    }

    const message = await Message.findById(id);
    if (!message) return res.status(404).json({ message: "Message not found" });

    if (scope === "all") {
      if (message.senderId.toString() !== myId.toString()) {
        return res.status(403).json({ message: "Not allowed" });
      }
      await Message.findByIdAndDelete(id);
      return res.status(200).json({ message: "Deleted for all" });
    }

    await Message.findByIdAndUpdate(
      id,
      { $addToSet: { deletedFor: myId } },
      { new: true }
    );

    return res.status(200).json({ message: "Deleted for me" });
  } catch (error) {
    console.log("Error in deleteMessage controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getChatPartners = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;

    // find all the messages where the logged-in user is either sender or receiver
    const messages = await Message.find({
      $or: [{ senderId: loggedInUserId }, { receiverId: loggedInUserId }],
    });

    const chatPartnerIds = [
      ...new Set(
        messages.map((msg) =>
          msg.senderId.toString() === loggedInUserId.toString()
            ? msg.receiverId.toString()
            : msg.senderId.toString()
        )
      ),
    ];

    const chatPartners = await User.find({ _id: { $in: chatPartnerIds } }).select("-password");

    res.status(200).json(chatPartners);
  } catch (error) {
    console.error("Error in getChatPartners: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

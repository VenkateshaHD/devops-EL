import express from "express";
import {
  getAllContacts,
  getChatPartners,
  getMessagesByUserId,
  deleteMessage,
  markConversationSeen,
  sendMessage,
} from "../controllers/message.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
// Temporarily disabled - Arcjet causing timeout issues
// import { arcjetProtection } from "../middleware/arcjet.middleware.js";

const router = express.Router();

// the middlewares execute in order - so requests get rate-limited first, then authenticated.
// this is actually more efficient since unauthenticated requests get blocked by rate limiting before hitting the auth middleware.
// Temporarily disabled - Arcjet causing timeout issues
// router.use(arcjetProtection, protectRoute);
router.use(protectRoute);

router.get("/contacts", getAllContacts);
router.get("/chats", getChatPartners);
router.get("/:id", getMessagesByUserId);
router.post("/seen/:id", markConversationSeen);
router.post("/delete/:id", deleteMessage);
router.post("/send/:id", sendMessage);

export default router;

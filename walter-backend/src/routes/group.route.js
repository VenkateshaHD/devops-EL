import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { createGroup, getMyGroups, getGroupMessages } from "../controllers/group.controller.js";

const router = express.Router();

router.post("/create", protectRoute, createGroup);
router.get("/", protectRoute, getMyGroups);
router.get("/:groupId", protectRoute, getGroupMessages);

export default router;

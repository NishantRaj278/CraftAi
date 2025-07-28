import express from "express";
import {
  addChatToSession,
  getSessionById,
  getUserSessions,
  newSession,
} from "../controllers/session.controller.js";
import authToken from "../middlewares/authToken.js";
const router = express.Router();

router.get("/user-session", authToken, getUserSessions);
router.get("/:id", authToken, getSessionById);
router.post("/new-session", authToken, newSession);
router.put("/add-chat", authToken, addChatToSession);

export default router;

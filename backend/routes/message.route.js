import express from "express";
import authToken from "../middlewares/authToken.js";
import {
  createMessage,
  getAllMessages,
} from "../controllers/message.controller.js";
const router = express.Router();

router.get("/allMessages", authToken, getAllMessages);
router.post("/createMessage", authToken, createMessage);

export default router;

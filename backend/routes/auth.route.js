import express from "express";
import {
  getProfile,
  login,
  logout,
  register,
} from "../controllers/auth.controller.js";
import authToken from "../middlewares/authToken.js";
const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.post("/logout", authToken, logout);
router.get("/profile", authToken, getProfile);

export default router;

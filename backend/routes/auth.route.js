import express from "express";
import {
  signup,
  login,
  logout,
  profile,
  refreshToken,
} from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
const router = express.Router();
//develop routes to the endpoints
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/profile", protectRoute, profile);
router.post("/refresh-token", refreshToken);
export default router;

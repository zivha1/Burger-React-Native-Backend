import express from "express";
import { AuthController } from "../controllers/authController";
import { requireAuth } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);

//protected routes
router.get("/me", requireAuth, AuthController.getMe);

export default router;

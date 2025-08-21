import express from "express";
import { AuthController } from "../controllers/authController";

const router = express.Router();

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.get("/me", AuthController.getMe);

export default router;

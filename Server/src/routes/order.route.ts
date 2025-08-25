import express from "express";
import { orderController } from "../controllers/order.controller";
import { requireAuth } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/", orderController.addToOrder);
router.get("/", orderController.getUser);

export default router;

import express from "express";
import { orderController } from "../controllers/order.controller";
import { requireAuth } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/", orderController.addToOrder);
router.patch("/item", orderController.decreaseFromOrder);
router.post("/item", orderController.removeFromOrder);
router.delete("/:id", orderController.clearOrder);
router.get("/:id", orderController.getOrder);

export default router;

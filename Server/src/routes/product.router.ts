import express from "express";
import { ProductController } from "../controllers/product.controller";
import { requireAdmin, requireAuth } from "../middleware/authMiddleware";

const router = express.Router();

//CUSTOMER
router.get("/", requireAuth, ProductController.getAll);
router.get("/:id", requireAuth, ProductController.getProductById);

//ADMIN
router.post("/", requireAuth, requireAdmin, ProductController.create);
router.put("/:_id", requireAuth, requireAdmin, ProductController.update);
router.delete("/:_id", requireAuth, requireAdmin, ProductController.delete);

export default router;

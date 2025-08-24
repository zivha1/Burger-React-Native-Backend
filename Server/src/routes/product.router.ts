import express from "express";
import { ProductController } from "../controllers/product.controller";
import { requireAuth } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/", requireAuth, ProductController.getAll);
router.post("/", requireAuth, ProductController.create);
router.put("/:_id", requireAuth, ProductController.update);
router.get("/:id", requireAuth, ProductController.getProductById);
router.delete("/:_id", requireAuth, ProductController.delete);

export default router;

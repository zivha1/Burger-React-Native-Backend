import { Router } from "express";
import ProductController from "../controllers/productController";
const router = Router();

router.get("/allProducts", ProductController.getAllProducts);
router.post("/", ProductController.createProduct);
router.get("/:id", ProductController.getProductById);

export default router;

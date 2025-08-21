import { Router } from "express";
import productsRoute from "./productRoute";

const router = Router();

// router.use('/auth',authRoute);
router.use("/products", productsRoute);

export default router;

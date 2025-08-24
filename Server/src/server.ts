import express from "express";
import connectDB from "./config/db";
import authRouter from "./routes/auth.route";
import productRouter from "./routes/product.router";
import orderRouter from "./routes/order.route";
const app = express();
const PORT = 3001;

connectDB();
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/products", productRouter);
app.use("/api/order", orderRouter);

app.get("/health", (req, res) => {
  res.send("Server is OK!");
});

app.listen(PORT, () => {
  console.log("Server running on Port:", PORT);
});

import express from "express";
import connectDB from "./config/db";
import authRouter from "./routes/auth.route";
import productRouter from "./routes/product.router";
const app = express();
const PORT = 3001;

connectDB();
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/products", productRouter);

app.get("/health", (req, res) => {
  res.send("Server is OK!");
});

app.listen(PORT, () => {
  console.log("Server running on Port:", PORT);
});

import express from "express";
import connectDB from "./config/db";
import authRouter from "./routes/auth.route";
import bodyParser from "body-parser";
const app = express();
const PORT = 3001;

connectDB();
app.use(express.json());
app.use("/api/auth", authRouter);
app.get("/health", (req, res) => {
  res.send("Server is OK!");
});

app.listen(PORT, () => {
  console.log("Server running on Port:", PORT);
});

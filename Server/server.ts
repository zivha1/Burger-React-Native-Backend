import express from "express";
import connectDB from "./src/config/db";

const app = express();
const PORT = 3001;

connectDB();

app.listen(PORT, () => {
  console.log("Server running on Port:", PORT);
});

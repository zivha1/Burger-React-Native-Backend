import express from "express";
import connectDB from "./config/db";
import routes from "./routes/routes";
const app = express();
const PORT = 3001;

connectDB();
app.use(express.json());
app.use("/api", routes);

app.listen(PORT, () => {
  console.log("Server running on Port:", PORT);
});

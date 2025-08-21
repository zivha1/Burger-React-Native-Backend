import { connect } from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const mongoURI = process.env.MONGO_URI || "";
if (!mongoURI) {
  throw new Error("mongo uri not set");
}
async function connectDB() {
  try {
    // console.log("Connecting...");
    await connect(mongoURI);
    console.log("Connected to db!");
  } catch (err: any) {
    console.error(err.message);
  }
}

export default connectDB;

import { verifyToken } from "../utils/jwt";
import { RequestHandler } from "express";
import { AuthRequest } from "../types/express";

export const requireAuth: RequestHandler = (req, res, next) => {
  const auth = req.headers.authorization || "";
  const bearer = auth.startsWith("Bearer ");
  if (!bearer) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  const token = auth.slice(7);
  const payload = verifyToken(token);

  if (!payload || typeof payload !== "object" || !("id" in payload)) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  (req as AuthRequest).userId = String(payload.id);
  return next();
};

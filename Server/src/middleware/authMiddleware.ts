import { verifyToken } from "../utils/jwt";
import { RequestHandler } from "express";
import { AuthRequest } from "../types/express";

export const requireAuth: RequestHandler = (req, res, next) => {
  const auth = req.headers.authorization || "";
  const bearer = auth.startsWith("Bearer ");
  if (!bearer) {
    console.log("I am here");

    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  const token = auth.slice(7);
  const payload = verifyToken(token);

  if (!payload?.id || !payload.role) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  (req as AuthRequest).userId = String(payload.id);
  (req as AuthRequest).role = String(payload.role);
  return next();
};

export const requireAdmin: RequestHandler = (req, res, next) => {
  const role = (req as AuthRequest).role;
  if (role !== "admin") {
    return res.status(403).json({ success: false, message: "Admin only" });
  }
  next();
};

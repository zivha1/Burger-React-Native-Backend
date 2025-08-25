import { Request, Response, NextFunction } from "express";

export interface AuthRequest extends Request {
  userId: string;
  role: string;
}

export type AuthRequestHandler = (req: AuthRequest, res: Response, next: NextFunction) => void | Response;

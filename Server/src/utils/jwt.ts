import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";
const JWT_EXPIRE = (process.env.JWT_EXPIRE || "1d") as jwt.SignOptions["expiresIn"];

export interface JWTPayload extends JwtPayload {
  id: string;
  email: string;
  name: string;
  role: "admin" | "customer";
}

export const generateToken = (payload: JWTPayload, opts?: SignOptions): string => {
  const options: SignOptions = {
    expiresIn: JWT_EXPIRE,
    ...opts,
  };
  return jwt.sign(payload, JWT_SECRET, options);
};

export const verifyToken = (token: string): JwtPayload => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (typeof decoded === "string") {
      throw new Error("Invalid token format");
    }
    return decoded as JwtPayload;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Token verification failed: ${error.message}`);
    }
    throw new Error("Invalid token");
  }
};

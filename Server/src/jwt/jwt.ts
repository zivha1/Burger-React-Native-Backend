import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";
const JWT_EXPIRE = process.env.JWT_EXPIRE || "1d";

export const generateToken = (payload: any): string => {
  const options = {
    expiresIn: JWT_EXPIRE,
  };
  return jwt.sign(payload, JWT_SECRET, options);
};

export const verifiedToken = (token: string): boolean => {
  try {
    const decoded = jwt.verifiedToken(token, JWT_SECRET);
    return decoded;
  } catch (error) {
    throw new Error("Invalid token");
  }
};

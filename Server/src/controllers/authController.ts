import { Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../models/UserSchema";
import { generateToken } from "../utils/jwt";
import { AuthRequest } from "../types/express";

export const AuthController = {
  //Post /auth/register
  register: async (req: Request, res: Response) => {
    //console.log(req.body);
    try {
      const { email, password, name } = req.body;

      if (!email || !password || !name) {
        return res.status(400).json({
          success: false,
          message: "Missing fields for user creation",
        });
      }

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(409).json({
          success: false,
          message: "This email is already in the system",
        });
      }

      const newUser = await User.create({
        email,
        name,
        password,
      });

      const token = generateToken({
        id: newUser._id.toString(),
        email: newUser.email,
        name: newUser.name,
      });

      const response = {
        success: true,
        message: "User registered successfully",
        data: {
          user: {
            _id: newUser._id.toString(),
            name: newUser.name,
            email: newUser.email,
          },
          token,
        },
      };

      return res.status(201).json(response);
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Server error during registration",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  },

  //POST auth/login
  login: async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({
          success: false,
          message: "Email and password are required",
        });
      }

      const user = await User.findOne({ email }).select("+password");
      if (!user) {
        return res.status(401).json({
          success: false,
          message: "User does not exist in the DB",
        });
      }

      const comparePassword = await bcrypt.compare(password, user.password);
      if (!comparePassword) {
        return res.status(401).json({
          success: false,
          message: "Invalid password",
        });
      }

      const token = generateToken({
        id: user._id.toString(),
        email: user.email,
        name: user.name,
      });

      const response = {
        success: true,
        message: "User logged in successfully",
        data: {
          user: {
            _id: user._id.toString(),
            name: user.name,
            email: user.email,
          },
          token,
        },
      };

      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Server error during login",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  },

  //Get auth/me
  getMe: async (req: Request, res: Response) => {
    try {
      const authReq = req as AuthRequest;
      const user = await User.findById(authReq.userId);

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      const response = {
        success: true,
        message: "User profile retrieved successfully",
        data: {
          user: {
            _id: user._id.toString(),
            name: user.name,
            email: user.email,
          },
        },
      };

      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Server error while retrieving user profile",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  },
};

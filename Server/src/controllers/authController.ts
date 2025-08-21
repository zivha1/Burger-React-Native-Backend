import { Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../models/UserSchema";
import { generateToken, verifiedToken } from "../jwt/jwt";

export const AuthController = {
  //Post /auth/register
  register: async (req: Request, res: Response) => {
    try {
      console.log(req.body);

      const { email, password, name } = req.body;

      if (!email || !password || !name) {
        console.log("Start");
        res.status(404).json({
          success: false,
          message: "Missing fields for user creation",
        });
        return;
      }
      console.log("End");

      const existingUser = await User.find({ email });
      if (existingUser) {
        res.status(400).json({
          success: false,
          message: "This email is already in the system",
        });
        return;
      }

      const newUser = await User.create({
        email,
        name,
        password,
      });

      console.log("User created");

      const token = await generateToken({
        id: newUser._id.toString(),
        email: newUser.email,
        password: newUser.password,
      });

      console.log(`Token Created: ${token}`);

      const response = {
        success: true,
        message: "User register successfully",
        data: {
          user: {
            id: newUser._id.toString(),
            name: newUser.name,
            email: newUser.email,
          },
          token,
        },
      };

      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({
        success: false,
        error,
      });
    }
  },

  //POST auth/login
  login: async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      res.status(401).json({
        success: false,
        message: "Invalid credentials ",
      });
      return;
    }

    const validPassword = user.password === password;
    if (!validPassword) {
      res.status(401).json({
        success: false,
        message: "invalid password!",
      });
    }

    const token = generateToken({
      id: user._id.toString(),
      email: user.email,
      name: user.name,
    });

    const response = {
      success: true,
      message: "User Logged in!",
      data: {
        user: {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
        },
        token,
      },
    };

    res.status(200).json(response);
  },

  getMe: async (req: Request, res: Response) => {
    const user = req.user;
    const response = {
      success: true,
      message: "User Logged in!",
      data: {
        user: {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
        },
      },
    };
    res.status(200).json(response);
  },
};

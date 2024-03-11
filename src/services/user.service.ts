import { Request, Response } from "express";
import userModal from "../models/user.modal";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signup = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(body.password, salt);
    await userModal.create({
      ...body,
      password: hashedPassword,
    });
    return res
      .status(201)
      .json({ ok: true, message: "User created successfully" });
  } catch (e) {
    return res
      .status(400)
      .json({ ok: false, message: "Error While creating the User: " + e });
  }
};

export const signin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await userModal.findOne({ email });
    if (!user) {
      return res.status(404).json({ ok: false, message: "User not found" });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ ok: false, message: "Invalid password" });
    }
    const token = jwt.sign({ userId: user._id }, `${process.env.JWT_SECRET}`, {
      expiresIn: "1h",
    });

    res.cookie("token", token, {
      httpOnly: false,
      maxAge: 3600000,
    });

    return res.status(200).json({ ok: true, message: "Login successful" });
  } catch (e) {
    return res.status(400).json({ ok: false, message: "Signin error: " + e });
  }
};

export const logOut = (res: Response) => {
  try {
    res.clearCookie("token");
    return res
      .status(200)
      .json({ ok: true, message: "Logged out successfully" });
  } catch (e) {
    return res.status(400).json({ ok: false, message: "Logout error: " + e });
  }
};

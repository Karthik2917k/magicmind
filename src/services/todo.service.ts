import { Request, Response } from "express";
import todoModal from "../models/todo.modal";
import jwt from "jsonwebtoken";
export const createTodo = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const { token } = req.cookies;
    if (!token) {
      return res
        .status(400)
        .json({ ok: false, message: "User not authorized" });
    }
    const decoded: any = jwt.decode(token);
    await todoModal.create({
      ...data,
      user: decoded.userId,
    });
    return res
      .status(201)
      .json({ ok: true, message: "Todo created successfully" });
  } catch (e) {
    return res
      .status(400)
      .json({ ok: false, message: "Error While creating the Todo: " + e });
  }
};

export const getTodos = async (req: Request, res: Response) => {
  try {
    const todos = await todoModal.find();
    return res.status(200).json({ ok: true, todos });
  } catch (e) {
    return res
      .status(400)
      .json({ ok: false, message: "While getting the todos " + e });
  }
};

export const getTodoById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const todo = await todoModal.findById(id);
    if (!todo) {
      return res.status(404).json({ ok: false, message: "Todo not found" });
    }
    return res.status(200).json({ ok: true, todo });
  } catch (error) {
    return res
      .status(500)
      .json({ ok: false, message: "Internal server error", error });
  }
};

export const updateTodo = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const todo = await todoModal.findByIdAndUpdate(id, data);
    if (!todo) {
      return res.status(404).json({ ok: false, message: "Todo not found" });
    }
    return res.status(200).json({ ok: true, message: "Updated Todo" });
  } catch (error) {
    return res
      .status(500)
      .json({ ok: false, message: "Internal server error", error });
  }
};

export const deleteTodo = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const todo = await todoModal.findByIdAndDelete(id);
    if (!todo) {
      return res.status(404).json({ ok: false, message: "Todo not found" });
    }
    return res.json({ ok: true, message: "Todo deleted successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ ok: false, message: "Internal server error", error });
  }
};

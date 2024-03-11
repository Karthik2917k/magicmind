import { Router, Request, Response } from "express";
import {
  createTodo,
  getTodos,
  getTodoById,
  updateTodo,
  deleteTodo,
} from "../services/todo.service";

const todoRouter = Router();

todoRouter.post("/", (req: Request, res: Response) => {
  return createTodo(req, res);
});

todoRouter.get("/", (req: Request, res: Response) => {
  return getTodos(req, res);
});

todoRouter.get("/:id", (req: Request, res: Response) => {
  return getTodoById(req, res);
});

todoRouter.patch("/:id", (req: Request, res: Response) => {
  return updateTodo(req, res);
});

todoRouter.delete("/:id", (req: Request, res: Response) => {
  return deleteTodo(req, res);
});

export default todoRouter;

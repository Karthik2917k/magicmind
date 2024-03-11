import { Router } from "express";
import userRouter from "../controllers/user.controller";
import todoRouter from "../controllers/todo.controller";

const routes = Router();

routes.get("/", (req, res) => {
  return res
    .status(200)
    .json({ ok: true, message: "Welcome to MagicMind API Application" });
});

routes.use("/user", userRouter);
routes.use("/todo", todoRouter);

export default routes;

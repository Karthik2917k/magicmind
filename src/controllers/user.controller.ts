import { Router, Request, Response } from "express";
import { signin, signup } from "../services/user.service";

const userRouter = Router();

userRouter.post("/signup", (req: Request, res: Response) => {
  return signup(req, res);
});

userRouter.post("/signin", (req: Request, res: Response) => {
  return signin(req, res);
});

export default userRouter;

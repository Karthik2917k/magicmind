import { Router, Request, Response } from "express";
import { logOut, signin, signup } from "../services/user.service";

const userRouter = Router();

userRouter.post("/signup", (req: Request, res: Response) => {
  return signup(req, res);
});

userRouter.post("/signin", (req: Request, res: Response) => {
  return signin(req, res);
});

userRouter.get("/logout", (req: Request, res: Response) => {
  return logOut(res);
});

export default userRouter;

import { Router, Request, Response } from "express";
import { logOut, signin, signup, validUser } from "../services/user.service";

const userRouter = Router();

userRouter.post("/signup", (req: Request, res: Response) => {
  return signup(req, res);
});

userRouter.post("/signin", (req: Request, res: Response) => {
  return signin(req, res);
});

userRouter.get("/valid", (req: Request, res: Response) => {
  return validUser(req, res);
});

userRouter.get("/logout", (req: Request, res: Response) => {
  return logOut(res);
});

export default userRouter;

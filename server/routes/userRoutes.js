import express from "express";
import userAuth from "../middleware/userAuth.js";
import { getUserData } from "../controllers/userController.js";
const userRouter = express.Router();
userRouter.get("/users/:userId", userAuth, getUserData);
// userRouter.get("/data", userAuth, getUserData);

export default userRouter;










import { Router } from "express";
import rootRouter from "./root";
import userRouter from "./user";

const router = Router();

router.use("/", rootRouter);
router.use("/user", userRouter);

export default router;

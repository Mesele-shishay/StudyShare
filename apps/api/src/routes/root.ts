import { Router, IRouter } from "express";
import { getRoot } from "../controllers/rootController";

const router: IRouter = Router();

router.get("/", getRoot);

export default router;

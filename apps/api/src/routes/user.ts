import { Router } from "express";
import { createUser, getUserByTelegramId } from "../controllers/userController";

const router = Router();

router.post("/", createUser);
router.get("/:telegram_id", getUserByTelegramId);

export default router;

import { Request, Response } from "express";
import { UserService } from "../services/userService";
import { asyncHandler } from "../middlewares/errorHandler";

export const createUser = asyncHandler(async (req: Request, res: Response) => {
  const result = await UserService.createUser(req.body);

  if (!result.success) {
    return res.status(400).json(result);
  }

  res.status(201).json(result);
});

export const getUserByTelegramId = asyncHandler(
  async (req: Request, res: Response) => {
    const telegramId = req.params.telegram_id;

    if (isNaN(Number(telegramId))) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID",
      });
    }

    const result = await UserService.getUserByTelegramId(telegramId);

    if (!result.success) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    console.log(result.data);

    res.json({
      success: true,
      message: "User retrieved successfully",
      data: result.data,
    });
  }
);

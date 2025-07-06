import { prisma } from "@repo/db";
import { userValidation } from "../validations/userValidation";
import { formatValidationError } from "../utils/errorHandler";
import { ZodError } from "zod";
import { BaseService, ServiceResult } from "./baseService";

export interface CreateUserData {
  email: string;
  first_name?: string;
  last_name?: string;
  username?: string;
  telegram_id: string;
}

export interface User {
  id: number;
  email: string;
  first_name: string | null;
  last_name: string | null;
  username: string | null;
  telegram_id: string | null;
  created_at: Date;
  updated_at: Date;
}

export class UserService extends BaseService {
  static async createUser(
    userData: CreateUserData
  ): Promise<ServiceResult<{ userId: number }>> {
    try {
      // Validate the input data
      const validateData = userValidation.safeParse(userData);
      if (!validateData.success) {
        const errorResponse = formatValidationError(validateData.error);
        return UserService.createErrorResult(
          errorResponse.message,
          errorResponse.errors
        );
      }

      const isUserExists = await prisma.user.findUnique({
        where: {
          telegram_id: validateData.data.telegram_id,
        },
      });

      if (isUserExists) {
        return UserService.createErrorResult("User already exists");
      }

      // Create user in database
      const user = await prisma.user.create({
        data: validateData.data,
      });

      return UserService.createSuccessResult("User added successfully", {
        userId: user.id,
      });
    } catch (error) {
      // Handle database errors
      if (error instanceof ZodError) {
        const errorResponse = formatValidationError(error);
        return UserService.createErrorResult(
          errorResponse.message,
          errorResponse.errors
        );
      }

      // Handle other errors (like database constraint violations)
      return UserService.handleError(error);
    }
  }

  static async getUserByTelegramId(
    telegramId: string
  ): Promise<ServiceResult<User>> {
    try {
      const user = await prisma.user.findUnique({
        where: { telegram_id: telegramId },
      });

      if (!user) {
        return UserService.createErrorResult("User not found");
      }

      return UserService.createSuccessResult(
        "User retrieved successfully",
        user
      );
    } catch (error) {
      return UserService.handleError(error);
    }
  }
}

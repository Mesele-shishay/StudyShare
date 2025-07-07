import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import {
  formatValidationError,
  createErrorResponse,
} from "../utils/errorHandler";

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Handle Zod validation errors
  if (error instanceof ZodError) {
    const errorResponse = formatValidationError(error);
    return res.status(400).json(errorResponse);
  }

  // Handle Prisma errors
  if (error && typeof error === "object" && "code" in error) {
    const prismaError = error as { code: string };
    switch (prismaError.code) {
      case "P2002":
        return res
          .status(409)
          .json(
            createErrorResponse(
              "A record with this unique field already exists"
            )
          );
      case "P2025":
        return res.status(404).json(createErrorResponse("Record not found"));
      default:
        return res
          .status(500)
          .json(createErrorResponse("Database operation failed"));
    }
  }

  // Handle other known errors
  if (error.name === "ValidationError") {
    return res.status(400).json(createErrorResponse("Validation failed", 400));
  }

  // Default error response
  return res
    .status(500)
    .json(createErrorResponse("Internal server error", 500));
};

export const asyncHandler = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

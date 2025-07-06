import { ZodError } from "zod";

export interface ValidationErrorResponse {
  success: false;
  message: string;
  errors: Array<{
    field: string;
    message: string;
  }>;
}

export const formatValidationError = (
  error: ZodError
): ValidationErrorResponse => {
  const formattedErrors = error.errors.map((err) => ({
    field: err.path.join("."),
    message: err.message,
  }));

  const errorMessages = formattedErrors.map(
    (err) => `${err.field}: ${err.message}`
  );
  const message = `Validation failed: ${errorMessages.join(", ")}`;

  return {
    success: false,
    message,
    errors: formattedErrors,
  };
};

export const createErrorResponse = (
  message: string,
  statusCode: number = 400,
  errors?: Array<{ field: string; message: string }>
) => {
  return {
    success: false,
    message,
    ...(errors && { errors }),
  };
};

# Error Handling Utilities

This directory contains utilities for consistent error handling across the API.

## Validation Error Response Format

When validation fails, the API returns a structured error response:

```json
{
  "success": false,
  "message": "Validation failed: email: Please provide a valid email address, telegram_id: Telegram ID is required",
  "errors": [
    {
      "field": "email",
      "message": "Please provide a valid email address"
    },
    {
      "field": "telegram_id",
      "message": "Telegram ID is required"
    }
  ]
}
```

## Success Response Format

Successful operations return:

```json
{
  "success": true,
  "message": "User added successfully",
  "data": {
    "userId": "123"
  }
}
```

## Usage

### In Controllers

```typescript
import { formatValidationError } from "../utils/errorHandler";
import { asyncHandler } from "../middlewares/errorHandler";

export const createUser = asyncHandler(async (req: Request, res: Response) => {
  const validateData = userValidation.safeParse(req.body);
  if (!validateData.success) {
    const errorResponse = formatValidationError(validateData.error);
    return res.status(400).json(errorResponse);
  }

  // ... rest of the logic
});
```

### Error Types Handled

- **Zod Validation Errors**: Automatically formatted with field-specific messages
- **Prisma Database Errors**: Handled with appropriate HTTP status codes
- **General Errors**: Fallback to generic error messages

## Middleware

The error handling middleware is automatically applied to all routes and handles:

- Validation errors (400)
- Database constraint violations (409)
- Not found errors (404)
- Internal server errors (500)

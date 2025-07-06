# Service Layer Architecture

This directory contains the service layer that handles business logic, separating it from controllers and making the code more maintainable and testable.

## Architecture Overview

```
Controller → Service → Database
    ↓         ↓         ↓
  Routes   Business   Prisma
           Logic
```

## Base Service

The `BaseService` class provides common functionality for all services:

- **createSuccessResult()**: Creates standardized success responses
- **createErrorResult()**: Creates standardized error responses
- **handleError()**: Centralized error handling

## User Service

The `UserService` handles all user-related business logic:

### Methods

- **createUser(userData)**: Creates a new user with validation
- **getUserById(userId)**: Retrieves a user by ID
- **getUserByEmail(email)**: Retrieves a user by email

### Response Format

All service methods return a `ServiceResult<T>` object:

```typescript
interface ServiceResult<T = any> {
  success: boolean;
  message: string;
  data?: T;
  errors?: Array<{ field: string; message: string }>;
}
```

## Usage Example

### In Controller

```typescript
export const createUser = asyncHandler(async (req: Request, res: Response) => {
  const result = await UserService.createUser(req.body);

  if (!result.success) {
    return res.status(400).json(result);
  }

  res.status(201).json(result);
});
```

### Benefits

1. **Separation of Concerns**: Controllers handle HTTP, services handle business logic
2. **Reusability**: Services can be used by multiple controllers
3. **Testability**: Business logic can be tested independently
4. **Maintainability**: Changes to business logic don't affect controllers
5. **Consistency**: Standardized response format across all services

## Adding New Services

1. Create a new service file extending `BaseService`
2. Implement business logic methods
3. Export from `index.ts`
4. Use in controllers

Example:

```typescript
export class CourseService extends BaseService {
  static async createCourse(
    courseData: CreateCourseData
  ): Promise<ServiceResult<Course>> {
    // Implementation
  }
}
```

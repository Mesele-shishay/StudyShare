export interface ServiceResult<T = any> {
  success: boolean;
  message: string;
  data?: T;
  errors?: Array<{ field: string; message: string }>;
}

export abstract class BaseService {
  protected static createSuccessResult<T>(
    message: string,
    data?: T
  ): ServiceResult<T> {
    return {
      success: true,
      message,
      ...(data && { data }),
    };
  }

  protected static createErrorResult(
    message: string,
    errors?: Array<{ field: string; message: string }>
  ): ServiceResult {
    return {
      success: false,
      message,
      ...(errors && { errors }),
    };
  }

  protected static handleError(error: any): ServiceResult {
    console.error("Service error:", error);

    return this.createErrorResult("An unexpected error occurred");
  }
}

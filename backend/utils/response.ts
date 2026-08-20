// API Standard Response Formatter
// Formats success and error responses consistently

export interface ApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  data?: T;
  error?: unknown;
}

export const formatSuccess = <T>(data: T, message?: string): ApiResponse<T> => ({
  success: true,
  message,
  data,
});

export const formatError = (message: string, error?: unknown): ApiResponse => ({
  success: false,
  message,
  error,
});

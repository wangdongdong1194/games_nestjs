export interface ApiResponse<T = any> {
  code: number;
  message: string;
  data: T;
}

export function success<T = any>(
  data: T,
  message = 'success',
  code = 0,
): ApiResponse<T> {
  console.log('Response data:', { code, message, data });
  return { code: code ? (data ? 0 : 1) : 0, message, data };
}

export function error(message = 'error', code = 1): ApiResponse<null> {
  return { code, message, data: null };
}

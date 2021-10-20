export type ResultSuccess<T> = {
  type: 'success'
  value: T
}

export type ResultError = {
  type: 'error'
  error: Error
  status: number
  message: string
}

export type Result<T> = ResultSuccess<T> | ResultError


export function isError<T>(result: Result<T>): result is ResultError {
  return result.type === "error";
}
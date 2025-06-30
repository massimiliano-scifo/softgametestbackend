export class HttpError extends Error {
  statusCode: number;

  constructor(statusCode: number = 500, message: string) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}

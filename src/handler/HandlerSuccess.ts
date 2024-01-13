import { Response } from 'express';

export default class HandlerSuccess {
  public readonly error: boolean;
  public readonly message: string;
  public readonly value: unknown | null;
  public readonly statusCode: number;

  constructor(message: string, statusCode = 200, value = null) {
    this.error = false;
    this.message = message;
    this.value = value;
    this.statusCode = statusCode;
  }

  toJSON(response: Response) {
    return response.status(this.statusCode).json({
      error: this.error,
      message: this.message,
      value: this.value,
    });
  }
}

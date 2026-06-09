import { Response } from 'express';

export function sendSuccess(res: Response, data: unknown, statusCode: number = 200): void {
  res.status(statusCode).json({
    success: true,
    data,
  });
}

export function sendCreated(res: Response, data: unknown): void {
  sendSuccess(res, data, 201);
}

export function sendNoContent(res: Response): void {
  res.status(204).send();
}

export function sendError(res: Response, message: string, statusCode: number = 400): void {
  res.status(statusCode).json({
    success: false,
    error: message,
  });
}

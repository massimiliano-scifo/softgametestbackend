import express from 'express';
import { HttpError } from '../classes/HttpError.js';

export const handleError = (err: HttpError, res: express.Response): void => {
  const { statusCode, message } = err;
  res.status(statusCode).json({
    status: 'error',
    statusCode,
    message,
  });
};
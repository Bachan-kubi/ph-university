import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
import { TErrorSources } from '../interface/error';
import config from '../config';
import handleZodError from '../Error/handleZodError';
import handleMongooseErrors from '../Error/handleMongooeError';
import handleCastErrors from '../Error/handelCastErrors';
import handleDuplicateErrors from '../Error/handleDuplicateErrors';
import AppError from '../Error/AppError';

export const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let statusCode = 500;
  let message = "Something went wrong!";

  let errorSources: TErrorSources = [{
    path: "",
    message: "Something went wrong!",
  }];

  if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources
    console.log(simplifiedError);
  } else if (err?.name === "ValidatonError") {
    const simplifiedError = handleMongooseErrors(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  } else if (err?.name === "CastError") {
    const simplifiedError = handleCastErrors(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  } else if (err?.code === 11000) {
    const simplifiedError = handleDuplicateErrors(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  } else if (err instanceof AppError) {
    statusCode = err?.statusCode;
    message = err?.message;
    errorSources = [{
      path: "",
      message: err?.message
    }]
  } else if (err instanceof Error) {
    message = err?.message;
    errorSources = [{
      path: "",
      message: err?.message
    }]
  }
  // ultimate return 
  res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    err,
    stack: config.NODE_ENV === 'development' ? err?.stack : null
  });
};

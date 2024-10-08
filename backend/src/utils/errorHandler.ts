import { Request, Response, NextFunction } from 'express';
import { UniqueConstraintError } from 'sequelize';
import { TypeNarrowingError } from './typeNarrowers';
import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';
import logger from '#src/utils/logger';

const errorHandler = (
  error: unknown,
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  logger('errorHandler:', error);

  const errorObjectCreator = (name: string, message: string) => {
    return {
      'Error name': name,
      'Error message': message
    };
  };

  if (error instanceof Error && error.name === 'SequelizeDatabaseError') {
    return res.status(400).json(errorObjectCreator(error.name, error.message));
  }

  if (error instanceof Error && error.name === 'SequelizeValidationError') {
    return res.status(400).json(errorObjectCreator(error.name, error.message));
  }

  if (error instanceof UniqueConstraintError) {
    return res
      .status(400)
      .json(errorObjectCreator(error.name, error.errors[0].message));
  }

  if (error instanceof TypeNarrowingError) {
    return res.status(400).json(errorObjectCreator(error.name, error.message));
  }

  if (error instanceof JsonWebTokenError) {
    return res.status(400).json(errorObjectCreator(error.name, error.message));
  }

  if (error instanceof TokenExpiredError) {
    return res.status(401).json(errorObjectCreator(error.name, error.message));
  }

  next(error);
  return;
};

export default errorHandler;

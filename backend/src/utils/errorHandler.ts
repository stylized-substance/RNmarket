import { Request, Response, NextFunction } from 'express';
import { UniqueConstraintError } from 'sequelize';

const errorHandler = (
  error: unknown,
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log('errorHandler:', error);

  if (error instanceof Error && error.name === 'SequelizeDatabaseError') {
    const errorObject = {
      'Error name': error.name,
      'Error message': error.message
    };
    return res.status(400).send(errorObject);
  }

  if (error instanceof UniqueConstraintError) {
    const errorObject = {
      'Error name': error.name,
      'Error message': error.errors[0].message
    };
    return res.status(400).send(errorObject);
  }

  next(error);
  return;
};

export default errorHandler;

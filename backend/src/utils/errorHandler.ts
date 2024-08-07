import { Request, Response, NextFunction } from 'express'

const errorHandler = (error: Error, _req: Request, res: Response, next: NextFunction) => {
  if (error.name === 'SequelizeDatabaseError') {
    return res.status(400).send(error.message)
  }

  next(error)
  return
}


export default errorHandler
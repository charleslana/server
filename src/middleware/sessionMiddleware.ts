import { NextFunction, Request, Response } from 'express';

export const sessionMiddleware = (request: Request, response: Response, next: NextFunction) => {
  const { session } = request;
  if (!session || !session.userCharacterId) {
    return response
      .status(422)
      .json({ error: true, message: 'User character ID is missing in the session' });
  }
  next();
};

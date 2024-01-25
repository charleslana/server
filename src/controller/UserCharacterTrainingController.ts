import logger from 'utils/logger';
import { NextFunction, Request, Response } from 'express';
import { UserCharacterTrainingService } from 'service/UserCharacterTrainingService';

export default class UserCharacterTrainingController {
  public static async init(request: Request, response: Response, next: NextFunction) {
    logger.info(`Init training user character ${request.session.userCharacterId}`);
    try {
      if (request.session.userCharacterId) {
        const handler = await UserCharacterTrainingService.initTraining(
          request.session.userCharacterId
        );
        return handler.toJSON(response);
      }
    } catch (error) {
      next(error);
    }
  }

  public static async conclude(request: Request, response: Response, next: NextFunction) {
    logger.info(`Conclude training user character ${request.session.userCharacterId}`);
    try {
      if (request.session.userCharacterId) {
        const handler = await UserCharacterTrainingService.concludeTraining(
          request.session.userCharacterId
        );
        return handler.toJSON(response);
      }
    } catch (error) {
      next(error);
    }
  }

  public static async cancel(request: Request, response: Response, next: NextFunction) {
    logger.info(`Cancel training user character ${request.session.userCharacterId}`);
    try {
      if (request.session.userCharacterId) {
        const handler = await UserCharacterTrainingService.cancelTraining(
          request.session.userCharacterId
        );
        return handler.toJSON(response);
      }
    } catch (error) {
      next(error);
    }
  }
}

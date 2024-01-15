import ICharacter from 'interface/ICharacter';
import logger from 'utils/logger';
import { CharacterService } from 'service/CharacterService';
import { NextFunction, Request, Response } from 'express';

export default class CharacterController {
  public static async create(
    request: Request<Record<string, unknown>, unknown, { name: string }>,
    response: Response,
    next: NextFunction
  ) {
    logger.info(`Create character ${request.body.name}`);
    try {
      const handler = await CharacterService.create(request.body.name);
      return handler.toJSON(response);
    } catch (error) {
      next(error);
    }
  }

  public static async get(
    request: Request<{ id: string }>,
    response: Response,
    next: NextFunction
  ) {
    logger.info(`Get character with id ${request.params.id}`);
    try {
      return response.status(200).json(await CharacterService.get(+request.params.id));
    } catch (error) {
      next(error);
    }
  }

  public static async getAll(_request: Request, response: Response, next: NextFunction) {
    logger.info('Get all characters');
    try {
      return response.status(200).json(await CharacterService.getAll());
    } catch (error) {
      next(error);
    }
  }

  public static async update(
    request: Request<Record<string, unknown>, unknown, ICharacter>,
    response: Response,
    next: NextFunction
  ) {
    logger.info(`Update character with name ${request.body.name}`);
    try {
      const updateCharacter = request.body;
      const handler = await CharacterService.update(updateCharacter);
      return handler.toJSON(response);
    } catch (error) {
      next(error);
    }
  }

  public static async delete(
    request: Request<{ id: string }>,
    response: Response,
    next: NextFunction
  ) {
    logger.info(`Delete character with id ${request.params.id}`);
    try {
      const handler = await CharacterService.delete(+request.params.id);
      return handler.toJSON(response);
    } catch (error) {
      next(error);
    }
  }
}

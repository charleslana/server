import logger from 'utils/logger';
import UserCharacterClassEnum from 'enum/UserCharacterClassEnum';
import UserCharacterFactionEnum from 'enum/UserCharacterFactionEnum';
import { ICreateUserCharacter } from 'interface/IUserCharacter';
import { NextFunction, Request, Response } from 'express';
import { UserCharacterService } from 'service/UserCharacterService';

export default class UserCharacterController {
  public static async create(
    request: Request<Record<string, unknown>, unknown, ICreateUserCharacter>,
    response: Response,
    next: NextFunction
  ) {
    logger.info(`Create user character ${request.body.name}`);
    try {
      const createUserCharacter = request.body;
      createUserCharacter.userId = request.user.id;
      const handler = await UserCharacterService.create(createUserCharacter);
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
    logger.info(`Get user character with id ${request.params.id}`);
    try {
      const { id } = request.params;
      return response.status(200).json(await UserCharacterService.get(id));
    } catch (error) {
      next(error);
    }
  }

  public static async getUserCharacterMe(request: Request, response: Response, next: NextFunction) {
    logger.info(`Get user character me ${request.user.id}`);
    try {
      if (request.session.userCharacterId) {
        return response
          .status(200)
          .json(await UserCharacterService.get(request.session.userCharacterId));
      }
      return response.status(422).json();
    } catch (error) {
      next(error);
    }
  }

  public static async getAllByUserId(request: Request, response: Response, next: NextFunction) {
    logger.info('Get all user characters');
    try {
      return response.status(200).json(await UserCharacterService.getAllByUserId(request.user.id));
    } catch (error) {
      next(error);
    }
  }

  public static async delete(
    request: Request<{ id: string }>,
    response: Response,
    next: NextFunction
  ) {
    logger.info(`Delete user character with id ${request.params.id}`);
    try {
      const handler = await UserCharacterService.deleteByIdAndUserId(
        request.params.id,
        request.user.id
      );
      return handler.toJSON(response);
    } catch (error) {
      next(error);
    }
  }

  public static async select(
    request: Request<{ id: string }>,
    response: Response,
    next: NextFunction
  ) {
    logger.info(`Select user character with id ${request.params.id}`);
    try {
      const find = await UserCharacterService.getByIdAndUserId(request.params.id, request.user.id);
      request.session.userCharacterId = find.id;
      return response.status(200).json();
    } catch (error) {
      next(error);
    }
  }

  public static async logout(request: Request, response: Response, next: NextFunction) {
    logger.info(`Logout user character ${request.session.userCharacterId}`);
    try {
      request.session.userCharacterId = null;
      return response.status(200).json();
    } catch (error) {
      next(error);
    }
  }

  public static async getTopRankedByFaction(
    request: Request<
      Record<string, unknown>,
      unknown,
      unknown,
      { faction: UserCharacterFactionEnum }
    >,
    response: Response,
    next: NextFunction
  ) {
    logger.info(`Get top ranked by faction ${request.query.faction}`);
    try {
      return response
        .status(200)
        .json(await UserCharacterService.getTopRankedByFaction(request.query.faction));
    } catch (error) {
      next(error);
    }
  }

  public static async getTopRankedByClass(
    request: Request<Record<string, unknown>, unknown, unknown, { class: UserCharacterClassEnum }>,
    response: Response,
    next: NextFunction
  ) {
    logger.info(`Get top ranked by class ${request.query.class}`);
    try {
      return response
        .status(200)
        .json(await UserCharacterService.getTopRankedByClass(request.query.class));
    } catch (error) {
      next(error);
    }
  }
}

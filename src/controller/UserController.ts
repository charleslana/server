import logger from 'utils/logger';
import { ICheckEmail, ICheckUsername, ICreateUser, IUserAuth } from 'interface/IUser';
import { NextFunction, Request, Response } from 'express';
import { UserService } from 'service/UserService';

export default class UserController {
  public static async create(
    request: Request<Record<string, unknown>, unknown, ICreateUser>,
    response: Response,
    next: NextFunction
  ) {
    logger.info(`Create user ${request.body.username}`);
    try {
      const createUser = request.body;
      const handler = await UserService.createUserWithRole(createUser);
      return handler.toJSON(response);
    } catch (error) {
      next(error);
    }
  }

  public static async checkUsernameExists(
    request: Request<ICheckUsername>,
    response: Response,
    next: NextFunction
  ) {
    logger.info(`Check username exists ${request.params.username}`);
    try {
      const username = request.params.username;
      const exists = await UserService.checkUsernameExists(username);
      response.status(200).json({ exists });
    } catch (error) {
      next(error);
    }
  }

  public static async checkEmailExists(
    request: Request<ICheckEmail>,
    response: Response,
    next: NextFunction
  ) {
    logger.info(`Check email exists ${request.params.email}`);
    try {
      const email = request.params.email;
      const exists = await UserService.checkEmailExists(email);
      response.status(200).json({ exists });
    } catch (error) {
      next(error);
    }
  }

  public static async getUserMe(request: Request, response: Response, next: NextFunction) {
    logger.info(`Get user me ${request.user.id}`);
    try {
      return response.status(200).json(await UserService.getUserById(request.user.id));
    } catch (error) {
      next(error);
    }
  }

  public static async get(
    request: Request<{ id: string }>,
    response: Response,
    next: NextFunction
  ) {
    logger.info(`Get user profile with id ${request.params.id}`);
    try {
      const { id } = request.params;
      return response.status(200).json(await UserService.getUserByProfileId(id));
    } catch (error) {
      next(error);
    }
  }

  public static async getAll(_request: Request, response: Response, next: NextFunction) {
    logger.info('Get all users');
    try {
      return response.status(200).json(await UserService.getAllUsers());
    } catch (error) {
      next(error);
    }
  }

  public static async auth(
    request: Request<Record<string, unknown>, unknown, IUserAuth>,
    response: Response,
    next: NextFunction
  ) {
    logger.info(`Authenticate user ${request.body.username}`);
    try {
      const { username, password } = request.body;
      return response.status(200).json(await UserService.authenticate(username, password));
    } catch (error) {
      next(error);
    }
  }

  public static async getUserVIP(request: Request, response: Response, next: NextFunction) {
    logger.info(`Get user VIP ${request.user.id}`);
    try {
      return response.status(200).json({ vip: await UserService.getUserVIP(request.user.id) });
    } catch (error) {
      next(error);
    }
  }
}

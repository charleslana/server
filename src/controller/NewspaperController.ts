import logger from 'utils/logger';
import { ICreateNewspaper, IUpdateNewspaper } from 'interface/INewspaper';
import { NewspaperService } from 'service/NewspaperService';
import { NextFunction, Request, Response } from 'express';

export default class NewspaperController {
  public static async create(
    request: Request<Record<string, unknown>, unknown, ICreateNewspaper>,
    response: Response,
    next: NextFunction
  ) {
    logger.info(`Create newspaper ${request.body.title}`);
    try {
      const newspaper = request.body;
      newspaper.userId = request.user.id;
      const handler = await NewspaperService.create(newspaper);
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
    logger.info(`Get newspaper with id ${request.params.id}`);
    try {
      return response.status(200).json(await NewspaperService.get(+request.params.id));
    } catch (error) {
      next(error);
    }
  }

  public static async getAllPaginated(
    request: Request<Record<string, unknown>, unknown, unknown, { page: string }>,
    response: Response,
    next: NextFunction
  ) {
    logger.info(`Get all newspaper paginated ${request.query.page}`);
    try {
      return response.status(200).json(
        await NewspaperService.getAllPaginated({
          page: +request.query.page,
          pageSize: 5,
        })
      );
    } catch (error) {
      next(error);
    }
  }

  public static async update(
    request: Request<Record<string, unknown>, unknown, IUpdateNewspaper>,
    response: Response,
    next: NextFunction
  ) {
    logger.info(`Update newspaper with title ${request.body.title}`);
    try {
      const updateNewspaper = request.body;
      const handler = await NewspaperService.update(updateNewspaper);
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
    logger.info(`Delete newspaper with id ${request.params.id}`);
    try {
      const handler = await NewspaperService.delete(+request.params.id);
      return handler.toJSON(response);
    } catch (error) {
      next(error);
    }
  }
}

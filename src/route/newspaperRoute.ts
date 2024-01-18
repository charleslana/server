import authenticateMiddleware from 'middleware/authenticateMiddleware';
import express from 'express';
import NewspaperController from 'controller/NewspaperController';
import roleMiddleware from 'middleware/roleMiddleware';
import UserRoleEnum from 'enum/UserRoleEnum';
import { idParamMiddleware, pageMiddleware } from 'middleware/celebrate/commonCelebrate';
import {
  escapeNewspaperHTMLMiddleware,
  newspaperCreateMiddleware,
  newspaperUpdateMiddleware,
} from 'middleware/celebrate/newspaperCelebrate';

const newspaperRoute = express.Router();

newspaperRoute
  .route('/')
  .post(
    newspaperCreateMiddleware(),
    escapeNewspaperHTMLMiddleware,
    authenticateMiddleware,
    roleMiddleware([UserRoleEnum.Admin]),
    NewspaperController.create
  );

newspaperRoute
  .route('/:id')
  .get(idParamMiddleware(), authenticateMiddleware, NewspaperController.get);

newspaperRoute
  .route('/')
  .get(pageMiddleware(), authenticateMiddleware, NewspaperController.getAllPaginated);

newspaperRoute
  .route('/')
  .put(
    newspaperUpdateMiddleware(),
    escapeNewspaperHTMLMiddleware,
    authenticateMiddleware,
    roleMiddleware([UserRoleEnum.Admin]),
    NewspaperController.update
  );

newspaperRoute
  .route('/:id')
  .delete(
    idParamMiddleware(),
    authenticateMiddleware,
    roleMiddleware([UserRoleEnum.Admin]),
    NewspaperController.delete
  );

export default newspaperRoute;

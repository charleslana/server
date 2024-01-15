import authenticateMiddleware from 'middleware/authenticateMiddleware';
import CharacterController from 'controller/CharacterController';
import express from 'express';
import roleMiddleware from 'middleware/roleMiddleware';
import UserRoleEnum from 'enum/UserRoleEnum';
import { idParamMiddleware } from 'middleware/celebrate/commonCelebrate';
import {
  characterCreateMiddleware,
  characterUpdateMiddleware,
  escapeCharacterHTMLMiddleware,
} from 'middleware/celebrate/characterCelebrate';

const characterRoute = express.Router();

characterRoute
  .route('/')
  .post(
    characterCreateMiddleware(),
    escapeCharacterHTMLMiddleware,
    authenticateMiddleware,
    roleMiddleware([UserRoleEnum.Admin]),
    CharacterController.create
  );

characterRoute
  .route('/:id')
  .get(idParamMiddleware(), authenticateMiddleware, CharacterController.get);

characterRoute.route('/').get(authenticateMiddleware, CharacterController.getAll);

characterRoute
  .route('/')
  .put(
    characterUpdateMiddleware(),
    escapeCharacterHTMLMiddleware,
    authenticateMiddleware,
    roleMiddleware([UserRoleEnum.Admin]),
    CharacterController.update
  );

characterRoute
  .route('/:id')
  .delete(
    idParamMiddleware(),
    authenticateMiddleware,
    roleMiddleware([UserRoleEnum.Admin]),
    CharacterController.delete
  );

export default characterRoute;

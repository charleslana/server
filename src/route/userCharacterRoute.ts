import authenticateMiddleware from 'middleware/authenticateMiddleware';
import express from 'express';
import UserCharacterController from 'controller/UserCharacterController';
import { sessionMiddleware } from 'middleware/sessionMiddleware';
import { uuidParamMiddleware } from 'middleware/celebrate/commonCelebrate';
import {
  updateUserCharacterAvatarMiddleware,
  userCharacterCreateMiddleware,
  userCharacterTopClassMiddleware,
  userCharacterTopFactionMiddleware,
} from 'middleware/celebrate/userCharacterCelebrate';

const userCharacterRoute = express.Router();

userCharacterRoute
  .route('/')
  .post(userCharacterCreateMiddleware(), authenticateMiddleware, UserCharacterController.create);

userCharacterRoute
  .route('/profile/:id')
  .get(uuidParamMiddleware(), authenticateMiddleware, UserCharacterController.get);

userCharacterRoute
  .route('/me')
  .get(authenticateMiddleware, sessionMiddleware, UserCharacterController.getUserCharacterMe);

userCharacterRoute.route('/').get(authenticateMiddleware, UserCharacterController.getAllByUserId);

userCharacterRoute
  .route('/:id')
  .delete(uuidParamMiddleware(), authenticateMiddleware, UserCharacterController.delete);

userCharacterRoute.route('/select/:id').get(authenticateMiddleware, UserCharacterController.select);

userCharacterRoute
  .route('/logout')
  .get(authenticateMiddleware, sessionMiddleware, UserCharacterController.logout);

userCharacterRoute
  .route('/top/faction')
  .get(
    userCharacterTopFactionMiddleware(),
    authenticateMiddleware,
    sessionMiddleware,
    UserCharacterController.getTopRankedByFaction
  );

userCharacterRoute
  .route('/top/class')
  .get(
    userCharacterTopClassMiddleware(),
    authenticateMiddleware,
    sessionMiddleware,
    UserCharacterController.getTopRankedByClass
  );

userCharacterRoute
  .route('/avatar/:avatar')
  .put(
    updateUserCharacterAvatarMiddleware(),
    authenticateMiddleware,
    sessionMiddleware,
    UserCharacterController.updateAvatar
  );

export default userCharacterRoute;

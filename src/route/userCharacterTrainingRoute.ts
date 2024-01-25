import authenticateMiddleware from 'middleware/authenticateMiddleware';
import express from 'express';
import UserCharacterTrainingController from 'controller/UserCharacterTrainingController';
import { sessionMiddleware } from 'middleware/sessionMiddleware';

const userCharacterTrainingRoute = express.Router();

userCharacterTrainingRoute
  .route('/init')
  .put(authenticateMiddleware, sessionMiddleware, UserCharacterTrainingController.init);

userCharacterTrainingRoute
  .route('/conclude')
  .put(authenticateMiddleware, sessionMiddleware, UserCharacterTrainingController.conclude);

userCharacterTrainingRoute
  .route('/cancel')
  .put(authenticateMiddleware, sessionMiddleware, UserCharacterTrainingController.cancel);

export default userCharacterTrainingRoute;

import authenticateMiddleware from 'middleware/authenticateMiddleware';
import express from 'express';
import roleMiddleware from 'middleware/roleMiddleware';
import UserController from 'controller/UserController';
import UserRoleEnum from 'enum/UserRoleEnum';
import { userAuthMiddleware, userCreateMiddleware } from 'middleware/celebrate/userCelebrate';
import { uuidParamMiddleware } from 'middleware/celebrate/commonCelebrate';

const userRoute = express.Router();

userRoute.route('/').post(userCreateMiddleware(), UserController.create);

userRoute.route('/auth').post(userAuthMiddleware(), UserController.auth);

userRoute
  .route('/me')
  .get(
    authenticateMiddleware,
    roleMiddleware([UserRoleEnum.Admin, UserRoleEnum.User]),
    UserController.getUserMe
  );

userRoute
  .route('/profile/:id')
  .get(uuidParamMiddleware(), authenticateMiddleware, UserController.get);

userRoute.route('/').get(userCreateMiddleware(), UserController.getAll);

export default userRoute;

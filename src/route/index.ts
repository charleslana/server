import characterRoute from './characterRoute';
import newspaperRoute from './newspaperRoute';
import userCharacterRoute from './userCharacterRoute';
import userCharacterTrainingRoute from './userCharacterTrainingRoute';
import userRoute from './userRoute';
import { Router } from 'express';

const routes = Router();

routes.use('/user', userRoute);
routes.use('/character', characterRoute);
routes.use('/user-character', userCharacterRoute);
routes.use('/user-character/training', userCharacterTrainingRoute);
routes.use('/newspaper', newspaperRoute);

export default routes;

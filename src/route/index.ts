import characterRoute from './characterRoute';
import userRoute from './userRoute';
import { Router } from 'express';

const routes = Router();

routes.use('/user', userRoute);
routes.use('/character', characterRoute);

export default routes;

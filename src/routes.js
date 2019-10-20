import { Router } from 'express';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import UserMiddlewares from './app/middlewares/UserMiddlewares';

const routes = new Router();

routes.post(
  '/users',
  UserMiddlewares.checkIfUserAlreadyExists,
  UserController.store
);

routes.post('/sessions', UserMiddlewares.checkAccount, SessionController.store);

export default routes;

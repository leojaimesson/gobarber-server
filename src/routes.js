import { Router } from 'express';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import UserMiddleware from './app/middlewares/UserMiddleware';
import SessionMiddleware from './app/middlewares/SessionMiddleware';
import AuthMiddleware from './app/middlewares/AuthMiddleware';

const routes = new Router();

routes.post(
  '/users',
  UserMiddleware.checkIfUserAlreadyExists,
  UserController.store
);

routes.post(
  '/sessions',
  SessionMiddleware.checkAccount,
  SessionController.store
);

routes.use(AuthMiddleware.auth);

routes.put('/users', UserController.update);

export default routes;

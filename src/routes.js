import { Router } from 'express';
import User from './app/models/User';

const routes = new Router();

routes.get('/', async (request, response) => {
  const user = await User.create({
    name: 'leo jaimesson',
    email: 'leo.jaimesson@gmail.com',
    password_hash: '12345',
  });
  response.json(user);
});

export default routes;

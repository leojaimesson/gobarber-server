import HttpStatus from 'http-status-codes';
import UserService from '../services/UserService';

class UserController {
  async store(request, response) {
    try {
      const user = await UserService.store(request.body, request.loggedUser);
      return response.status(HttpStatus.OK).json(user);
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message:
          'Bad Request. Your application sent a request that this server could not understand.',
      });
    }
  }

  async update(request, response) {
    try {
      const user = await UserService.update(request.body, request.loggedUser);
      return response.status(HttpStatus.OK).json(user);
    } catch (error) {
      console.log(error);
      return response.status(error.status).json(error);
    }
  }
}

export default new UserController();

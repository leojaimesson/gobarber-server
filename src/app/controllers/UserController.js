import HttpStatus from 'http-status-codes';
import UserService from '../services/UserService';

class UserController {
  async checkIfUserExists(request, response, next) {
    const { email } = request.body;
    const user = await UserService.getUserByEmail(email || '');
    if (user) {
      return response
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: 'User already exists.' });
    }
    return next();
  }

  async store(request, response) {
    try {
      const user = await UserService.store(request.body);
      return response.status(HttpStatus.OK).json(user);
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message:
          'Bad Request. Your application sent a request that this server could not understand.',
      });
    }
  }
}

export default new UserController();

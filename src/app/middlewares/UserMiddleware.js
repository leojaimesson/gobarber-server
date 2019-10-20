import HttpStatus from 'http-status-codes';
import UserService from '../services/UserService';

class UserMiddleware {
  async checkIfUserAlreadyExists(request, response, next) {
    const { email } = request.body;
    const user = await UserService.getUserByEmail(email || '');
    if (user) {
      return response
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: 'User already exists.' });
    }
    return next();
  }
}

export default new UserMiddleware();

import HttpStatus from 'http-status-codes';
import UserService from '../services/UserService';

class UserMiddlewares {
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

  async checkAccount(request, response, next) {
    const { email, password } = request.body;
    const user = await UserService.getUserByEmail(email || '');
    if (!user) {
      return response.status(HttpStatus.UNAUTHORIZED).json({
        message: `Acccount with email=${email} not found.`,
      });
    }
    const isChecked = await user.checkPassword(password);
    if (!isChecked) {
      return response.status(HttpStatus.UNAUTHORIZED).json({
        message: 'Access is denied. Password does not match.',
      });
    }
    return next();
  }
}

export default new UserMiddlewares();

import HttpStatus from 'http-status-codes';
import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import authConfig from '../../configs/auth';

class AuthMiddleware {
  async auth(request, response, next) {
    try {
      const { authorization } = request.headers;
      const [, token] = authorization.split(' ');
      const { id } = await promisify(jwt.verify)(token, authConfig.secret);
      request.loggedUser = { id };
      return next();
    } catch (error) {
      return response
        .status(HttpStatus.UNAUTHORIZED)
        .json({ message: 'Invalid token' });
    }
  }
}

export default new AuthMiddleware();

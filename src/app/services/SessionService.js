import jwt from 'jsonwebtoken';
import authConfig from '../../configs/auth';
import UserService from './UserService';

class SessionService {
  async store(emailAccount) {
    const { id, name, email } = await UserService.getUserByEmail(emailAccount);

    return {
      user: {
        id,
        name,
        email,
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    };
  }
}

export default new SessionService();

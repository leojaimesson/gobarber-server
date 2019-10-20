import HttpStatus from 'http-status-codes';
import User from '../models/User';
import ApiError from '../errors/ApiError';

class UserService {
  async getUserByEmail(email) {
    const user = await User.findOne({ where: { email } });
    return user;
  }

  async store(user) {
    const { id, name, email, provider } = await User.create(user);
    return { id, name, email, provider };
  }

  async update(updatedUser, loggedUser) {
    const currentUser = await User.findByPk(loggedUser.id);
    if (updatedUser.email !== currentUser.email) {
      const userExists = await User.findOne({
        where: { email: updatedUser.email || '' },
      });
      if (userExists) {
        throw new ApiError(
          'Email already associated with another account.',
          HttpStatus.BAD_REQUEST
        );
      }
    }
    const isChecked = await currentUser.checkPassword(updatedUser.oldPassword);
    if (!isChecked) {
      throw new ApiError('Password does not match.', HttpStatus.UNAUTHORIZED);
    }
    const { id, name, provider, email } = await currentUser.update(updatedUser);

    return { id, name, provider, email };
  }
}

export default new UserService();

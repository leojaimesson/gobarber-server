import User from '../models/User';

class UserService {
  async getUserByEmail(email) {
    const user = await User.findOne({ where: { email } });
    return user;
  }

  async store(user) {
    const { id, name, email, provider } = await User.create(user);
    return { id, name, email, provider };
  }
}

export default new UserService();

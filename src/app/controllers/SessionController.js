import * as Yup from 'yup';
import HttpStatus from 'http-status-codes';
import SessionService from '../services/SessionService';

class SessionController {
  async store(request, response) {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required(),
        password: Yup.string().required(),
      });
      const validatedUser = await schema.validate(request.body);
      const { email } = validatedUser;
      const session = await SessionService.store(email);
      response.status(HttpStatus.OK).json(session);
    } catch (error) {
      response.status(HttpStatus.BAD_REQUEST).json(error);
    }
  }
}

export default new SessionController();

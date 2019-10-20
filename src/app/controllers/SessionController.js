import HttpStatus from 'http-status-codes';
import SessionService from '../services/SessionService';

class SessionController {
  async store(request, response) {
    try {
      const { email } = request.body;
      const session = await SessionService.store(email);
      response.status(HttpStatus.OK).json(session);
    } catch (error) {
      response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error);
    }
  }
}

export default new SessionController();

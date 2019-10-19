import HttpStatus from 'http-status-codes';
import ApiError from './ApiError';

const DEFAULT_MESSAGE =
  'Bad Request. Your application sent a request that this server could not understand.';

class BadRequestError extends ApiError {
  constructor(message = DEFAULT_MESSAGE, status = HttpStatus.BAD_REQUEST) {
    super(message, status);
  }
}

export default BadRequestError;

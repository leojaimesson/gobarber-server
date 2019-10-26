import * as Yup from 'yup';
import HttpStatus from 'http-status-codes';
import UserService from '../services/UserService';

class UserController {
  async store(request, response) {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required(),
        email: Yup.string()
          .email()
          .required(),
        password: Yup.string()
          .min(6)
          .required(),
      });
      const validatedUser = await schema.validate(request.body);
      const createdUser = await UserService.store(
        validatedUser,
        request.loggedUser
      );
      return response.status(HttpStatus.OK).json(createdUser);
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message:
          'Bad Request. Your application sent a request that this server could not understand.',
      });
    }
  }

  async update(request, response) {
    try {
      const schema = Yup.object().shape({
        name: Yup.string(),
        email: Yup.string().email(),
        oldPassword: Yup.string().min(6),
        password: Yup.string().when('oldPassword', (oldPassword, field) =>
          oldPassword ? field.required() : field
        ),
        confirmPassword: Yup.string().when((password, field) =>
          password ? field.required().oneOf([Yup.ref('password')]) : field
        ),
      });
      const validatedUser = await schema.validate(request.body);
      const updatedUser = await UserService.update(
        validatedUser,
        request.loggedUser
      );
      return response.status(HttpStatus.OK).json(updatedUser);
    } catch (error) {
      return response
        .status(error.status || HttpStatus.BAD_REQUEST)
        .json(error);
    }
  }
}

export default new UserController();

import { Router } from 'express';
import validation from 'express-validation';

import { authLocal } from '../../services/auth.services';
import * as userController from './user.controllers';
import userValidations from './user.validations';

const routes = new Router();

routes.post('/signup', validation(userValidations.signup), userController.signUp);
routes.post('/login', authLocal, userController.login);

export default routes;

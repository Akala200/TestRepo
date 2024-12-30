import { Router } from 'express';
import { body } from 'express-validator';
import AuthController from '../controllers/auth.controller';

class AuthRoutes {
  public router: Router;

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      '/register',
      [
        body('email').isEmail().withMessage('Invalid email format'),
        body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
        .matches(/[a-z]/).withMessage('Password must contain at least one lowercase letter')
        .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter')
        .matches(/[0-9]/).withMessage('Password must contain at least one digit')
        .matches(/[@$!%*?&]/).withMessage('Password must contain at least one special character'),
      ],
      AuthController.register.bind(AuthController) // Bind to ensure `this` context
    );

    this.router.post(
        '/login',
        [
          body('email').isEmail().withMessage('Invalid email format'),
          body('password').notEmpty().withMessage('Password is required'),
        ],
        AuthController.login
      );

      // Define the route for email verification
      this.router.get('/verify-email', AuthController.verifyEmail);
  }
}

export default new AuthRoutes().router;

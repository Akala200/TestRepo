import { Router } from 'express';
import ProfileController from '../controllers/profile.controller';
import authMiddleware from '../middlewares/auth.middleware';

class ProfileRoutes {
  public router: Router;

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    // Now the middleware is typed correctly, so you can safely use req.user
    this.router.get('/profile', authMiddleware, ProfileController.getProfile);
    // this.router.put('/profile', authenticate, upload.single('profileImage'), ProfileController.updateProfile);
  }
}

export default new ProfileRoutes().router;

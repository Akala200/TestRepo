import { Router } from 'express';
import DeviceController from '../controllers/device.controller';
import authMiddleware from '../middlewares/auth.middleware';

class DeviceRoutes {
  public router: Router;

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    // Fetch list of devices
    this.router.get('/devices', authMiddleware, DeviceController.getDevices);

    // Logout from a specific device
    this.router.post('/logout', authMiddleware, DeviceController.logoutFromDevice);
  }
}

export default new DeviceRoutes().router;

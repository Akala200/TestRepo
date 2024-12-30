import { Request, Response } from 'express';
import DeviceService from '../services/device.service';

class DeviceController {
  // Fetch list of devices where the user is logged in
  public async getDevices(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as any).user?.userId;
      if (!userId) {
        res.status(400).json({ message: 'User not authenticated' });
      }

      // Call DeviceService to get devices
      const devices = await DeviceService.getUserDevices(userId);
      res.status(200).json({ devices });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  // Logout from a specific device
  public async logoutFromDevice(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as any).user?.userId;
      const { deviceId } = req.body;

      if (!userId) {
        res.status(400).json({ message: 'User not authenticated' });
      }

      if (!deviceId) {
        res.status(400).json({ message: 'Device ID is required' });
      }

      // Call DeviceService to log out from device
      const device = await DeviceService.logoutFromDevice(userId, deviceId);
      res.status(200).json({ message: 'Successfully logged out from the device', device });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  // Add a device when the user logs in
  public async addDevice(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as any).user?.userId;
      const deviceInfo = {
        deviceName: req.body.deviceName,
        ipAddress: req.body.ipAddress,
        userAgent: req.body.userAgent,
      };

      if (!userId) {
         res.status(400).json({ message: 'User not authenticated' });
      }

      // Call DeviceService to add the device
      const newDevice = await DeviceService.addDevice(userId, deviceInfo);
      res.status(201).json({ message: 'Device added successfully', device: newDevice });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
}

export default new DeviceController();

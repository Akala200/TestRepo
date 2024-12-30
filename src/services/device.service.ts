import Device from '../models/device.model';
import { Types } from 'mongoose';

class DeviceService {
  // Fetch all devices for a user
  public async getUserDevices(userId: Types.ObjectId) {
    try {
      // Find all devices associated with the user
      const devices = await Device.find({ userId });
      return devices;
    } catch (error: any) {
      throw new Error('Failed to fetch devices: ' + error.message);
    }
  }

  // Logout from a specific device
  public async logoutFromDevice(userId: Types.ObjectId, deviceId: string) {
    try {
      // Find the device and delete it
      const device = await Device.findOneAndDelete({ _id: deviceId, userId });

      if (!device) {
        throw new Error('Device not found or not associated with the user');
      }

      return device;
    } catch (error: any) {
      throw new Error('Failed to log out from device: ' + error.message);
    }
  }

  // Add a new device for the user
  public async addDevice(userId: Types.ObjectId, deviceInfo: any) {
    try {
      const newDevice = new Device({
        userId,
        deviceName: deviceInfo.deviceName,
        ipAddress: deviceInfo.ipAddress,
        userAgent: deviceInfo.userAgent,
      });

      await newDevice.save();
      return newDevice;
    } catch (error: any) {
      throw new Error('Failed to add device: ' + error.message);
    }
  }
}

export default new DeviceService();

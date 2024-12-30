import mongoose, { Schema } from 'mongoose';
import { IDevice } from '../types/device.types';


const deviceSchema = new Schema<IDevice>({
  userId:  { type: String, required: true },
  deviceName: { type: String, required: true },
  ipAddress: { type: String, required: true },
  userAgent: { type: String, required: true },
  loginTimestamp: { type: Date, default: Date.now },
});

const Device = mongoose.model<IDevice>('Device', deviceSchema);

export default Device;

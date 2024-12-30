import { Document } from 'mongoose';

export interface IDevice extends Document {
    userId: string; // Reference to the user
    deviceName: string;
    ipAddress: string;
    userAgent: string;
    loginTimestamp: Date;
  }
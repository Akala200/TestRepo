import mongoose from 'mongoose';
import { config } from '../config';  // Importing the config where you have your environment variables

const connectDB = async () => {
  try {
    await mongoose.connect(config.databaseUrl);
    console.log('MongoDB connected successfully!');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1); // Exit process with failure
  }
};

export default connectDB;

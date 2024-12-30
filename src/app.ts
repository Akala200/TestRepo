import express, { Application } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import connectDB from './config/db';  // MongoDB connection
import ExampleRoutes from './routes/example.routes';  // Example route
import ProfileRoutes from './routes/profile.routes';  // Profile routes
import DeviceRoutes from './routes/device.routes';    // Device routes
import AuthRoutes from './routes/auth.routes';        // Auth routes

dotenv.config();  // Load environment variables from .env file

class App {
  public app: Application;
  private port: number;

  constructor(port: number) {
    this.app = express();
    this.port = port;

    // Connect to MongoDB before initializing the server
    this.connectToDatabase();
    this.initializeMiddlewares();
    this.initializeRoutes();
  }

  // MongoDB connection method
  private async connectToDatabase() {
    await connectDB(); // Call the connectDB function to establish the connection
  }

  private initializeMiddlewares() {
    this.app.use(bodyParser.json());
    this.app.use(cors());
    this.app.use(helmet());
    this.app.use(morgan('dev'));

    // Rate limiter middleware
    const limiter = rateLimit({
      windowMs: 15 * 60 * 1000,  // 15 minutes
      max: 100,  // Limit each IP to 100 requests per window
    });
    this.app.use(limiter);
  }

  private initializeRoutes() {
    // Example route
    this.app.use('/api/example', ExampleRoutes);

    // Auth route
    this.app.use('/api/auth', AuthRoutes);  // Auth route

    // Profile and Devices routes
    this.app.use('/api/profile', ProfileRoutes);  // Profile route
    this.app.use('/api/devices', DeviceRoutes);    // Device route
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`Server is running on port ${this.port}`);
    });
  }
}

export default App;

import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import AuthService from '../services/auth.service';
import DeviceService from '../services/device.service';
import { ObjectId } from 'mongodb'; // or the appropriate type from your database library

class AuthController {
  public register = async (req: Request, res: Response): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    const { email, password } = req.body;

    try {
      const { token } = await AuthService.registerUser(email, password);

      // Generate the verification link
      const verificationLink = `${req.protocol}://${req.get('host')}/api/auth/verify-email?token=${token}`;

      res.status(201).json({
        message: 'User registered successfully. Please verify your email.',
        verificationLink,
      });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };

  public login = async (req: Request, res: Response): Promise<void> => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }
  
      const { email, password } = req.body;
  
      try {
        const { accessToken, user } = await AuthService.loginUser(email, password);
  
        // Track device information
        const deviceInfo = req.headers['user-agent']; // User agent (browser info)
        const ipAddress = req.ip; // IP address of the client
  
        // Add device to the database
        await DeviceService.addDevice(user?._id as ObjectId, {
          deviceName: deviceInfo,
          ipAddress,
          userAgent: deviceInfo,
        });
  
        res.status(200).json({
          message: 'Login successful',
          tokens: {
            accessToken,
          },
        });
      } catch (error: any) {
        res.status(401).json({ error: error.message });
      }
    };

    public async verifyEmail(req: Request, res: Response) {
        const token = req.query.token as string;
    
        try {
          const result = await AuthService.verifyEmailToken(token);
          res.status(200).json(result);
        } catch (error: any) {
          res.status(400).json({ message: error.message });
        }
      }
}

export default new AuthController();

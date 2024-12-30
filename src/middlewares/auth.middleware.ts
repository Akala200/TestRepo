import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config'; // Import your config

interface JwtPayload {
  userId: string; // Add other properties in the JWT payload if needed
}

const authMiddleware = (req: any, res: Response, next: NextFunction): void => {
  const token = req.headers['authorization']?.split(' ')[1]; // Extract token from Authorization header
  
  if (!token) {
    res.status(401).json({ message: 'No token provided' });
    return; // Exit after sending response
  }

  try {
    // Use the JWT secret from the config
    const decoded = jwt.verify(token, config.jwtSecret) as JwtPayload;

    // Attach user info to the request object
    req.user = { userId: decoded.userId }; // Attach user ID or any other info you need

    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};

export default authMiddleware;

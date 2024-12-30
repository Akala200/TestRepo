import jwt from 'jsonwebtoken';
import { config } from '../config';

export const generateJwtToken = (payload: object, expiresIn: string = '1h'): string => {
  return jwt.sign(payload, config.jwtSecret, { expiresIn });
};

export const generateAccessToken = (payload: object): string => {
    return jwt.sign(payload, config.jwtSecret!, { expiresIn: '15m' });
  };
  
  export const verifyAccessToken = (token: string): any => {
    return jwt.verify(token, config.jwtSecret!);
  };
  
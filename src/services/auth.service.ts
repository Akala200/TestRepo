import bcrypt from 'bcrypt';
import User from '../models/user.model';
import { generateAccessToken, generateJwtToken } from '../utils/jwt.util';
import { IUser } from '../types/user.types';
import jwt from 'jsonwebtoken';
import { config } from '../config';

class AuthService {
  public async registerUser(email: string, password: string): Promise<{ user: IUser; token: string }> {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error('User already exists');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = await User.create({ email, password: hashedPassword });

    // Generate email verification token
    const verificationToken = generateJwtToken({ userId: newUser._id }, '24h');

    return { user: newUser, token: verificationToken };
  }

  public async loginUser(email: string, password: string) {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('Invalid email or password.');
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid email or password.');
    }

    if (!user.isVerified) {
        throw new Error('Account not verified. Please verify your email.');
      }

    // Generate access token
    const accessToken = generateAccessToken({ userId: user._id, email: user.email });
    

    return { accessToken, user };
  }

  public async verifyEmailToken(token: string) {
    if (!token) {
      throw new Error('Token is required');
    }

    try {
      // Verify the token using the secret key
      const decoded = jwt.verify(token, config.jwtSecret) as { userId: string };

      // Find the user by the decoded userId
      const user = await User.findById(decoded.userId);

      if (!user) {
        throw new Error('User not found');
      }

      // Check if the email is already verified
      if (user.isVerified) {
        throw new Error('Email already verified');
      }

      // Update user email verified status
      user.isVerified = true;
      await user.save();

      return { message: 'Email verified successfully' };

    } catch (error: any) {
      throw new Error(error.message || 'Invalid or expired token');
    }
  }
}

export default new AuthService();

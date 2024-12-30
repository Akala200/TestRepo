import { Request, Response } from 'express';
import ProfileService from '../services/profile.service';

class ProfileController {
  public async getProfile(req: Request, res: Response): Promise<void> {
    try {
      // Ensure `req.user` is typed correctly as AuthenticatedRequest
      const userId = (req as any).user?.userId; // Cast req to AuthenticatedRequest to access user
      if (!userId) {
        res.status(400).json({ message: 'User not authenticated' });
      }

      const user = await ProfileService.getUserProfile(userId);
      res.status(200).json({ user });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  public async updateProfile(req: Request, res: Response): Promise<void> {
    try {
      const updateData = { ...req.body };
      if (req.file) {
        updateData.profileImage = `/uploads/${req.file.filename}`;
      }

      const updatedUser = await ProfileService.updateUserProfile((req as any).user?.userId, updateData);
      res.status(200).json({ message: 'Profile updated successfully', user: updatedUser });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}

export default new ProfileController();

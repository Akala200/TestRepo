import UserModel from '../models/user.model';

class ProfileService {
  public async getUserProfile(userId: string) {
    const user = await UserModel.findById(userId).select('-password');
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  public async updateUserProfile(userId: string, updateData: Partial<{ username: string; email: string; profileImage: string }>) {
    const user = await UserModel.findByIdAndUpdate(userId, updateData, { new: true }).select('-password');
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }
}

export default new ProfileService();

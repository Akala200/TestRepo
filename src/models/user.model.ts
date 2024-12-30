import mongoose, { Schema } from 'mongoose';
import { IUser } from '../types/user.types';

const UserSchema: Schema = new Schema(
    {
        email: { type: String, required: true },
        password: { type: String, required: true },
        isVerified: { type: Boolean, default: false }, // Initialize as an empty array
        profileImage: { type: String },
      },
      { timestamps: true }
);

export default mongoose.model<IUser>('User', UserSchema);

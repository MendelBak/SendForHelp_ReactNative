import { Schema } from 'mongoose';
import mongoose from 'mongoose';
import { IUser } from '../interfaces/IUser';

const UserSchema = new Schema(
  {
    firstName: { type: String, required: true },
    middleName: { type: String, required: false },
    lastName: { type: String, required: true },
    preferredName: { type: String, required: false },
    age: { type: Number, required: true },
    email: { type: String, required: true },
    googleId: { type: String, required: true },
    isHero: { type: Boolean, required: true },
    // TODO: Create this as a separate schema.
    // priorConditions: { ref.object, required: true },
  },
  { timestamps: true, minimize: false }
);

export default mongoose.model<IUser>('User', UserSchema);

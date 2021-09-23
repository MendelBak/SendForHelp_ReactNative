import mongoose from 'mongoose';

export interface IUser extends mongoose.Document {
  firstName: string;
  middleName: string;
  lastName: string;
  prefferedName: string;
  age: number;
  email: string;
  googleId: string;
  isHero: boolean;
}

import mongoose from 'mongoose';

export interface IEmergency extends mongoose.Document {
  active: boolean;
  userId: string;
  responderOnScene: boolean;
  // responder: [],
}

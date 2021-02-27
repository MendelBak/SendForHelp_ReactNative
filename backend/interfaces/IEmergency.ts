import mongoose from 'mongoose';
import { IEmergencyLocation } from './IEmergencyLocation';
import { ISymptoms } from './ISymptoms';

export interface IEmergency extends mongoose.Document {
  active: boolean;
  userId: string;
  responderOnScene: boolean;
  symptoms: ISymptoms;
  emergencyLocation: IEmergencyLocation;
  // responder: [],
}

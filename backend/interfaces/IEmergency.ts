import mongoose from 'mongoose';
import { IEmergencyLocation } from './IEmergencyLocation';
import { ISymptom } from './ISymptom';

export interface IEmergency extends mongoose.Document {
  active: boolean;
  userId: string;
  responderOnScene: boolean;
  symptom: ISymptom;
  emergencyLocation: IEmergencyLocation;
  // responder: [],
}

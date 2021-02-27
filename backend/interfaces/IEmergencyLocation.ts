import mongoose from 'mongoose';

export interface IEmergencyLocation extends mongoose.Document {
  altitudeAccuracy: number;
  altitude: number;
  accuracy: number;
  heading: number;
  longitude: number;
  latitude: number;
  speed: number;
  timestamp: any;
  // This is a ref for use by express populate()
  emergency: string;
}

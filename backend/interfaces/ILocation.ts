import mongoose from 'mongoose';

export interface ILocation extends mongoose.Document {
  altitudeAccuracy: number;
  altitude: number;
  accuracy: number;
  heading: number;
  longitude: number;
  latitude: number;
  speed: number;
  timestamp: any;
  floor: number;
  doorCode: string;
  doorNum: string;
  // Work/Home (enums)
  description: string;
}

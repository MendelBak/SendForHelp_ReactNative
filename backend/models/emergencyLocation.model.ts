import mongoose, { Schema } from 'mongoose';
import { IEmergencyLocation } from '../interfaces/IEmergencyLocation';

const EmergencyLocationSchema = new Schema(
  {
    altitudeAccuracy: { type: Number, required: false },
    altitude: { type: Number, required: false },
    accuracy: { type: Number, required: true },
    heading: { type: Number, required: false },
    longitude: { type: Number, required: true },
    latitude: { type: Number, required: true },
    speed: { type: Number, required: false },
    emergency: { type: Schema.Types.ObjectId, required: true, ref: 'Emergency' },
  },
  { timestamps: true, minimize: false }
);

export default mongoose.model<IEmergencyLocation>(
  'EmergencyLocation',
  EmergencyLocationSchema
);

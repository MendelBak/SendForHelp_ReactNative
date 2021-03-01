import { Schema } from 'mongoose';
import mongoose from 'mongoose';
import { IEmergency } from '../interfaces/IEmergency';

const EmergencySchema = new Schema(
  {
    active: { type: Boolean, required: true },
    // User that initiated the emergency.
    userId: { type: String, required: true },
    responderOnScene: { type: Boolean, required: true },
    emergencyLocation: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'EmergencyLocation',
    },
    symptom: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Symptom',
    },
    // responders: { type: Object.ref, required: false },
  },
  { timestamps: true, minimize: false }
);

export default mongoose.model<IEmergency>('Emergency', EmergencySchema);

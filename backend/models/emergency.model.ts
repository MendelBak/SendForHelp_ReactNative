// import {Document, Schema, Model} from 'mongoose';
import mongoose from 'mongoose';
import { IEmergency } from '../interfaces/IEmergency';
// import Schema from 'mongoose.Schema';
const Schema = mongoose.Schema;

const EmergencySchema = new Schema(
  {
    active: { type: Boolean, required: true },
    // location: {type: Object.ref}
    bluntTrauma: { type: Boolean, required: true },
    hemmoraging: { type: Boolean, required: true },
    choking: { type: Boolean, required: true },
    drowning: { type: Boolean, required: true },
    stroke: { type: Boolean, required: true },
    heartRelated: { type: Boolean, required: true },
    allergyRelated: { type: Boolean, required: true },
    other: { type: Boolean, required: true },
    responderOnScene: { type: Boolean, required: true },
    // Responders: { type: Object.ref, required: false },
  },
  { timestamps: true, minimize: false }
);

export default mongoose.model<IEmergency>('Emergency', EmergencySchema);

// const Emergency = mongoose.model<IEmergency>('User', UserSchema);
// export default Emergency;

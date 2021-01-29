// import {Document, Schema, Model} from 'mongoose';
import mongoose from 'mongoose';
// import Schema from 'mongoose.Schema';
const Schema = mongoose.Schema;

const EmergencySchema = new Schema(
  {
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

export default mongoose.model('Emergency', EmergencySchema);

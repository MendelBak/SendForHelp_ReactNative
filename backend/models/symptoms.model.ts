import mongoose, { Schema } from 'mongoose';
import { ISymptoms } from '../interfaces/ISymptoms';

const SymptomsSchema = new Schema(
  {
    bluntTrauma: { type: Boolean, required: true },
    choking: { type: Boolean, required: true },
    drowning: { type: Boolean, required: true },
    hemmoraging: { type: Boolean, required: true },
    other: { type: Boolean, required: true },
    emergency: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Emergency',
    },
  },
  { timestamps: true, minimize: false }
);

export default mongoose.model<ISymptoms>('Symptoms', SymptomsSchema);

import mongoose, { Schema } from 'mongoose';
import { ISymptom } from '../interfaces/ISymptom';

const SymptomSchema = new Schema(
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

export default mongoose.model<ISymptom>('Symptom', SymptomSchema);

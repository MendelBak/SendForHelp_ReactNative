import mongoose from 'mongoose';

export interface ISymptoms extends mongoose.Document {
  bluntTrauma: boolean;
  hemmoraging: boolean;
  choking: boolean;
  drowning: boolean;
  //   stroke: boolean;
  //   heartRelated: boolean;
  //   allergyRelated: boolean;
  other: boolean;
  // This is a ref for use by express populate()
  emergency: string;
}

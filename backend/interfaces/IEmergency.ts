import mongoose from 'mongoose';

export interface IEmergency extends mongoose.Document {
  active: boolean;
  bluntTrauma: boolean;
  hemmoraging: boolean;
  choking: boolean;
  drowning: boolean;
  stroke: boolean;
  heartRelated: boolean;
  allergyRelated: boolean;
  other: boolean;
  responderOnScene: boolean;
  // responder: [],
}

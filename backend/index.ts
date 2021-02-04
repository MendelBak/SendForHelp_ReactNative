import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

// Internal
import { uri } from '../backend/config/dbConsts';
import emergencyRoute from './api/routes/emergency.route';
import emergencyLocationRoute from './api/routes/emergencyLocation.route';

module.exports.mongoose = mongoose;

const app = express();
const PORT = 8000;

import cors from 'cors';
app.use(cors());

app.all("/*", (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// Defines the routes used.
app.use('/emergency', emergencyRoute);
app.use('/emergencyLocation', emergencyLocationRoute);
// app.use('/location', locationRoute);
// app.use('/medicalHistory', medicalHistoryRoute);
// app.use('/user', userRoute);

app.listen(PORT, () => {
  // console.log(uri);
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);

  mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'MongoDB connection error:'));
});

// module.exports = app;
export default app;

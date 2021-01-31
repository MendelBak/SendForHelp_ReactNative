// External
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

// Internal
import { uri } from '../backend/config/dbConsts';
import emergencyRoute from './api/routes/emergency.route';

module.exports.mongoose = mongoose;

const app = express();
const PORT = 8000;

app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// Defines the routes used.
app.use('/emergency', emergencyRoute);
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

import express from 'express';
import mongoose from 'mongoose';

// Internal
import { uri } from '../backend/config/dbConsts';
import cookieSession from 'cookie-session';
// require('./authentication/passport');
import cors from 'cors';
import keys from './config/keys';

import emergencyRoute from './api/routes/emergency.route';
import emergencyLocationRoute from './api/routes/emergencyLocation.route';
import './services/passport';
import passport from 'passport';

module.exports.mongoose = mongoose;

const app = express();
const PORT = 3000;

app.use(cors());

app.all('/*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With');
  next();
});

// parse application/json
app.use(express.json());

app.use(
  cookieSession({
    // milliseconds of a day
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.session.cookieKey],
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Defines the routes used.
app.use('/emergency', emergencyRoute);
app.use('/emergencyLocation', emergencyLocationRoute);
require('./api/routes/auth.route')(app);
// app.use('/location', locationRoute);
// app.use('/medicalHistory', medicalHistoryRoute);
// app.use('/user', userRoute);

app.listen(PORT, () => {
  try {
    console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);

    mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));
  } catch (err) {
    console.log('error starting the application ', err);
  }
});

// module.exports = app;
export default app;

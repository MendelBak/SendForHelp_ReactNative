// External
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

// Internal
import { uri } from '../backend/config/dbConsts';
import emergencyRoute from './api/routes/emergency.route'
// const emergencyRoute = require('./api/routes/emergency.route');

module.exports.mongoose = mongoose;

const router = express.Router();


const app = express();
const PORT = 8000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", emergencyRoute);
// app.use("/welcome", welcomeRouter);
// router.use('/test', emergencyRoute);
// app.use('/test', emergencyRoute);



app.get('/', (req, res) => res.send('Express + Dror Server'));

app.listen(PORT, () => {
  console.log(uri);
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);

  //Set up mongoose connection
  mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'MongoDB connection error:'));
  // db.collection('emergencies').findOne({}, function (err: any, result: any) {
  //   if (err) throw err;
  //   console.log(result);
  //   db.close();
  // });
});

module.exports = app;

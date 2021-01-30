// External
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

// Internal
import { uri } from '../backend/config/dbConsts';
import masterRoute from './api/masterRoute';

module.exports.mongoose = mongoose;

const app = express();
const PORT = 8000;

app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// Defines the routes used.
app.use('/', masterRoute);

app.listen(PORT, () => {
  // console.log(uri);
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);

  mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'MongoDB connection error:'));
});

// module.exports = app;
export default app;

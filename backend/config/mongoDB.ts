// const MongoClient = require('mongodb').MongoClient;
// import {uri } from './dbConsts'
// import db from '../index';


// const client = new MongoClient(uri, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// const test = () => {
//   console.log('test in mongodb');
//   db.collection('emergencies').findOne({}, function (err: any, result: any) {
//     if (err) throw err;
//     console.log(result);
//     db.close();
//   });

  // client.connect((err: any, db: any) => {

  //   if (err) throw err;
  //   var dbo = db.db('sendForHelpDB');
  //   db.collection('emergencies').findOne({}, function (err: any, result: any) {
  //     if (err) throw err;
  //     console.log(result);
  //     db.close();
  //   });
  // });
// };

// export default test;

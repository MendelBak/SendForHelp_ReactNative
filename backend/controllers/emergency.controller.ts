import EmergencySchema from '../models/emergency.model';
// const EmergencySchema = require('../models/emergency.model');
// const usersModel = require('Schemas/users')
import db from '../index';


export default module.exports = {
  createEmergency: async () => {
    const emergency = new EmergencySchema({
      //   location: ref.schema,
      bluntTrauma: false,
      hemmoraging: false,
      choking: false,
      drowning: false,
      stroke: false,
      heartRelated: false,
      other: false,
      responderOnScene: false,
      //   responders: ref.schemaObject
    });
    try {
      const newEmergency = await emergency.save();
      return newEmergency;
    } catch (error) {
      throw error;
    }
  },

  getEmergencyById: async (id: number) => {
    // ..
  },

  getAllEmergencies: async () => {
//       db.collection('emergencies').findOne({}, function (err: any, result: any) {
//     if (err) throw err;
//     console.log(result);
//     db.close();
//   });
  },

  updateEmergency: async (id: number) => {},

  endEmergency: async () => {},
};

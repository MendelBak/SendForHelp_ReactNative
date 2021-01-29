import EmergencySchema from '../models/emergency.model';
// const EmergencySchema = require('../models/emergency.model');
// const usersModel = require('Schemas/users')
import { IEmergency } from '../interfaces/IEmergency';

export default module.exports = {
  getAllEmergencies: async () => {
    try {
      return await EmergencySchema.find();
    } catch (err) {
      throw new Error('Server Error, could not return list of emergencies');
    }
  },

  getEmergency: async (id: string) => {
    try {
      return await EmergencySchema.findById({ _id: id });
    } catch (err) {
      throw new Error('Server Error, could not return list of emergencies');
    }
  },

  createEmergency: async () => {
    try {
      const emergency = new EmergencySchema({
        active: true,
        //   location: ref.schema,
        bluntTrauma: false,
        hemmoraging: false,
        choking: false,
        drowning: false,
        stroke: false,
        heartRelated: false,
        allergyRelated: false,
        other: false,
        responderOnScene: false,
        //   responders: ref.schemaObject
      });
      const newEmergency = await emergency.save();
      return newEmergency;
    } catch (err) {
      throw new Error('Server Error, could not create new emergency');
    }
  },

  updateEmergency: async (id: string) => {},

  endEmergency: async (emergency: IEmergency) => {

  },
};

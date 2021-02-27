import EmergencySchema from '../models/emergency.model';
import EmergencyLocationSchema from '../models/emergencyLocation.model';
import { IEmergency } from '../interfaces/IEmergency';
import { IEmergencyLocation } from '../interfaces/IEmergencyLocation';
import SymptomsModel from '../models/symptoms.model';

export default module.exports = {
  createEmergency: async (emergency: any) => {
    try {
      const newEmergencyLocation: any = new EmergencyLocationSchema({
        altitudeAccuracy: emergency.emergencyLocation.altitudeAccuracy,
        altitude: emergency.emergencyLocation.altitude,
        accuracy: emergency.emergencyLocation.accuracy,
        heading: emergency.emergencyLocation.heading,
        longitude: emergency.emergencyLocation.longitude,
        latitude: emergency.emergencyLocation.latitude,
        speed: emergency.emergencyLocation.speed,
      });

      const newSymptoms = new SymptomsModel({
        bluntTrauma: emergency.symptoms.bluntTrauma,
        choking: emergency.symptoms.choking,
        drowning: emergency.symptoms.drowning,
        hemmoraging: emergency.symptoms.hemmoraging,
        other: emergency.symptoms.other,
      });

      const emergencySchema = new EmergencySchema({
        active: true,
        userId: emergency.userId,
        responderOnScene: false,
        symptoms: newSymptoms,
        emergencyLocation: newEmergencyLocation,
        //   responders: ref.schemaObject
      });

      newEmergencyLocation.emergency = emergencySchema._id;
      newSymptoms.emergency = emergencySchema._id;

      await newSymptoms.save();
      await newEmergencyLocation.save();
      const newEmergency = await emergencySchema.save();
      return newEmergency;
    } catch (err) {
      throw new Error(`Server Error, could not create new emergency: ${err}`);
    }
  },

  getEmergency: async (id: string) => {
    try {
      return await EmergencySchema.findOne({ _id: id }).populate(
        'emergencyLocation symptoms'
      );
    } catch (err) {
      throw new Error(
        `Server Error, could not return emergency: ID = ${id} : ${err}`
      );
    }
  },

  getAllEmergencies: async () => {
    try {
      return await EmergencySchema.find().populate('emergencyLocation symptoms').exec();
    } catch (err) {
      throw new Error(
        `Server Error, could not return list of emergencies: ${err}`
      );
    }
  },

  updateEmergency: async (emergency: IEmergency) => {
    try {
      return await EmergencySchema.findOneAndUpdate(
        { _id: emergency._id },
        emergency
      );
    } catch (err) {
      throw new Error(`Server Error, could not update emergency: ${err}`);
    }
  },

  // End emergency by setting active status to false;
  endEmergency: async (id: string) => {
    try {
      return await EmergencySchema.findOneAndUpdate(
        { _id: id },
        { $set: { active: false } }
      );
    } catch (err) {
      throw new Error(`Server Error, could not end emergency: ${err}`);
    }
  },
};

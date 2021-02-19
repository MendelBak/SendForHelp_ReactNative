import EmergencySchema from '../models/emergency.model';
import EmergencyLocationSchema from '../models/emergencyLocation.model';
import { IEmergency } from '../interfaces/IEmergency';
import { IEmergencyLocation } from '../interfaces/IEmergencyLocation';

export default module.exports = {
  createEmergency: async (emergency: any) => {
    try {
      const newEmergencyLocation: any = new EmergencyLocationSchema({
        altitudeAccuracy: emergency.location.altitudeAccuracy,
        altitude: emergency.location.altitude,
        accuracy: emergency.location.accuracy,
        heading: emergency.location.heading,
        longitude: emergency.location.longitude,
        latitude: emergency.location.latitude,
        speed: emergency.location.speed,
      });

      const emergencySchema = new EmergencySchema({
        active: true,
        bluntTrauma: false,
        hemmoraging: false,
        choking: false,
        drowning: false,
        stroke: false,
        heartRelated: false,
        allergyRelated: false,
        other: false,
        responderOnScene: false,
        emergencyLocation: newEmergencyLocation,
        userId: emergency.userId,
        //   responders: ref.schemaObject
      });

      newEmergencyLocation.emergency = emergencySchema._id;
      await newEmergencyLocation.save();
      const newEmergency = await emergencySchema.save();
      return emergencySchema;
    } catch (err) {
      throw new Error(`Server Error, could not create new emergency: ${err}`);
    }
  },

  getEmergency: async (id: string) => {
    try {
      return await EmergencySchema.findOne({ _id: id }).populate(
        'emergencyLocation'
      );
    } catch (err) {
      throw new Error(
        `Server Error, could not return emergency of ID = ${id} : ${err}`
      );
    }
  },

  getAllEmergencies: async () => {
    try {
      return await EmergencySchema.find().populate('emergencyLocation').exec();
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
    return await EmergencySchema.findOneAndUpdate(
      { _id: id },
      { $set: { active: false } }
    );
  },
};

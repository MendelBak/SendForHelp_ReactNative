import EmergencyLocationSchema from '../models/emergencyLocation.model';
import { IEmergencyLocation } from '../interfaces/IEmergencyLocation';

export default module.exports = {
  //TODO: Might not need this route since creating new emergency location in emergency controller when creating new emergency event.
  createEmergencyLocation: async () => {
    try {

      // TODO: need to replace these with real values.
      const emergencyLocation = new EmergencyLocationSchema({
        altitudeAccuracy: 0,
        altitude: 0,
        accuracy: 0,
        heading: 0,
        longitude: 0,
        latitude: 0,
        speed: 0,
        userId: '123',
      });

      const newEmergencyLocation = await emergencyLocation.save();
      return newEmergencyLocation;
    } catch (err) {
      throw new Error(`Server Error, could not create new emergency location: ${err}`);
    }
  },

  getEmergencyLocation: async (id: string) => {
    try {
      return await EmergencyLocationSchema.findById({ _id: id });
    } catch (err) {
      throw new Error(
        `Server Error, could not return emergency location of ID = ${id} : ${err}`
      );
    }
  },

  getAllEmergencyLocations: async () => {
    try {
      return await EmergencyLocationSchema.find();
    } catch (err) {
      throw new Error(
        `Server Error, could not return list of emergencies: ${err}`
      );
    }
  },

  updateEmergencyLocation: async (emergencyLocation: IEmergencyLocation) => {
    try {
      return await EmergencyLocationSchema.findOneAndUpdate(
        { _id: emergencyLocation._id },
        emergencyLocation
      );
    } catch (err) {
      throw new Error(
        `Server Error, could not update emergency location: ${err}`
      );
    }
  },
};

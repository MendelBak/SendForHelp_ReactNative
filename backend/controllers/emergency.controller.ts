import EmergencySchema from '../models/emergency.model';
import EmergencyLocationSchema from '../models/emergencyLocation.model';
import { IEmergency } from '../interfaces/IEmergency';
import SymptomSchema from '../models/symptom.model';
const mongoose = require('mongoose');
import NotificationController from './notification.controller';
import { IEmergencyLocation } from '../interfaces/IEmergencyLocation';
import { ISymptom } from '../interfaces/ISymptom';

export default module.exports = {
  createEmergency: async (emergency: any) => {
    try {
      const newEmergencyLocation: IEmergencyLocation =
        new EmergencyLocationSchema({
          altitudeAccuracy: emergency.emergencyLocation.altitudeAccuracy,
          altitude: emergency.emergencyLocation.altitude,
          accuracy: emergency.emergencyLocation.accuracy,
          heading: emergency.emergencyLocation.heading,
          longitude: emergency.emergencyLocation.longitude,
          latitude: emergency.emergencyLocation.latitude,
          speed: emergency.emergencyLocation.speed,
        });

      const newSymptom: ISymptom = new SymptomSchema({
        bluntTrauma: emergency.symptom.bluntTrauma,
        choking: emergency.symptom.choking,
        drowning: emergency.symptom.drowning,
        hemmoraging: emergency.symptom.hemmoraging,
        other: emergency.symptom.other,
      });

      const emergencySchema: IEmergency = new EmergencySchema({
        active: true,
        userId: emergency.userId,
        responderOnScene: false,
        symptom: newSymptom,
        emergencyLocation: newEmergencyLocation,
        //   responders: ref.schemaObject
      });

      newEmergencyLocation.emergency = emergencySchema._id;
      newSymptom.emergency = emergencySchema._id;

      await newSymptom.save();
      await newEmergencyLocation.save();
      console.log(
        '🚀 ~ createEmergency: ~ newEmergencyLocation',
        newEmergencyLocation
      );
      const newEmergency = await emergencySchema.save();
      await NotificationController.sendEmergencyTopicPushNotification(
        newEmergencyLocation
      );
      return newEmergency;
    } catch (err) {
      throw new Error(`Server Error, could not create new emergency: ${err}`);
    }
  },

  getEmergency: async (id: string) => {
    try {
      return await EmergencySchema.findOne({ _id: id }).populate(
        'emergencyLocation symptom'
      );
    } catch (err) {
      throw new Error(
        `Server Error, could not return emergency: ID = ${id} : ${err}`
      );
    }
  },

  getAllEmergencies: async () => {
    try {
      return await EmergencySchema.find()
        .populate('emergencyLocation symptom')
        .exec();
    } catch (err) {
      throw new Error(
        `Server Error, could not return list of emergencies: ${err}`
      );
    }
  },

  //  Updates emergency collection.
  // TODO: Does this also update the sub collections (emergencyLocation & sympmtom)? I think not but need to verify.
  updateEmergency: async (emergency: IEmergency) => {
    try {
      return await EmergencySchema.findOneAndUpdate(
        { _id: emergency._id },
        emergency,
        { new: true }
      );
    } catch (err) {
      throw new Error(`Server Error, could not update emergency: ${err}`);
    }
  },

  updateSymptoms: async (emergency: IEmergency) => {
    try {
      console.log('emergency._id', emergency._id);
      return await SymptomSchema.findOneAndUpdate(
        { emergency: emergency._id },
        emergency.symptom,
        { new: true }
      );
    } catch (err) {
      throw new Error(`Server Error, could not update symptoms: ${err}`);
    }
  },

  endEmergency: async (id: string) => {
    try {
      return await EmergencySchema.findOneAndUpdate(
        { _id: id },
        { $set: { active: false } },
        { new: true }
      );
    } catch (err) {
      throw new Error(`Server Error, could not end emergency: ${err}`);
    }
  },
};

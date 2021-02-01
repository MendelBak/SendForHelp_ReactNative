// import EmergencySchema from '../models/emergency.model';
// import { IEmergency } from '../interfaces/IEmergency';

// export default module.exports = {
//   createEmergency: async () => {
//     try {
//       const emergency = new EmergencySchema({
//         active: true,
//         //   location: ref.schema,
//         bluntTrauma: false,
//         hemmoraging: false,
//         choking: false,
//         drowning: false,
//         stroke: false,
//         heartRelated: false,
//         allergyRelated: false,
//         other: false,
//         responderOnScene: false,
//         //   responders: ref.schemaObject
//       });
//       const newEmergency = await emergency.save();
//       return newEmergency;
//     } catch (err) {
//       throw new Error(`Server Error, could not create new emergency: ${err}`);
//     }
//   },

//   getEmergency: async (id: string) => {
//     try {
//       return await EmergencySchema.findById({ _id: id });
//     } catch (err) {
//       throw new Error(
//         `Server Error, could not return emergency of ID = ${id} : ${err}`
//       );
//     }
//   },

//   getAllEmergencies: async () => {
//     try {
//       return await EmergencySchema.find();
//     } catch (err) {
//       throw new Error(
//         `Server Error, could not return list of emergencies: ${err}`
//       );
//     }
//   },

//   // TODO: Should I return the updated object or just a 201?
//   updateEmergency: async (emergency: IEmergency) => {
//     try {
//       return await EmergencySchema.findOneAndUpdate(
//         { _id: emergency._id },
//         emergency
//       );
//     } catch (err) {
//       throw new Error(`Server Error, could not update emergency: ${err}`);
//     }
//   },

//   // End emergency by setting active status to false;
//   endEmergency: async (id: string) => {
//     return await EmergencySchema.findOneAndUpdate(
//       { _id: id },
//       { $set: { active: false } }
//     );
//   },
// };

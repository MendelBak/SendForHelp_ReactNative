var admin = require('firebase-admin');
var serviceAccount = require('../config/firebaseAdmin.json');
import { IEmergencyLocation } from '../interfaces/IEmergencyLocation';
import axios from 'axios';

// This file connects to the FCM - FIrebase Cloud messaging API using firebase-admin NPM package.

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  // databaseURL: 'https://my-project.firebaseio.com'
});

async function getNearestIntersection(emergencyLocation: IEmergencyLocation) {
  const test = await axios
    .get(
      `http://api.geonames.org/findNearestIntersectionOSMJSON?lat=${emergencyLocation?.latitude}&lng=${emergencyLocation?.longitude}&username=bystanderAccount`
    )
    .then((response) => {
      if (response) {
        return `${response?.data?.intersection?.street1} & ${response?.data?.intersection?.street2}`;
      } else {
        return 'Emergency In Your Area!';
      }
    })
    .catch((error) => {
      console.error(
        'There was an error finding the emergency intersection',
        error
      );
    });

  return test;
}

export default module.exports = {
  sendEmergencyTopicPushNotification: async (
    emergencyLocation: IEmergencyLocation
  ) => {
    const nearestIntersection = await getNearestIntersection(emergencyLocation);

    var message = {
      notification: {
        title: 'Emergency Reported',
        body: `${nearestIntersection}`,
      },
      android: {
        notification: {
          channel_id: 'hero',
        },
      },
      data: {
        emergencyId: emergencyLocation.emergency.toString(),
        latitude: emergencyLocation.latitude.toString(),
        longitude: emergencyLocation.longitude.toString(),
      },
      topic: 'emergency',
    };

    admin
      .messaging()
      .send(message)
      .then((response: any) => {
        // Response is a message ID string.
        console.log('Successfully sent message:', response);
      })
      .catch((error: any) => {
        console.log('Error sending message:', error);
      });
  },
};

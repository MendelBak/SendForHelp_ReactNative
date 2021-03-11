var admin = require('firebase-admin');
var serviceAccount = require('../config/firebaseAdmin.json');

// This file connects to the FCM - FIrebase Cloud messaging API using firebase-admin NPM package.

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  // databaseURL: 'https://my-project.firebaseio.com'
});

export default module.exports = {
  sendEmergencyTopicPushoNotification: async () => {
    var message = {
      notification: {
        title: 'Emergency Reported',
        body: 'There is an emergency in your area!',
      },
      topic: 'emergency',
    };

    console.log('new push message', message);

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

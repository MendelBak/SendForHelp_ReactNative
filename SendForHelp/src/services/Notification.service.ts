import PushNotification from 'react-native-push-notification';

// This sends a PUSH notification.
PushNotification.configure({
  // (required) Called when a remote or local notification is opened or received
  onNotification: function (notification) {
    console.log('PUSH NOTIFICATION ==>', notification);
  },
  popInitialNotification: true,
  requestPermissions: true,
});

// This sends a LOCAL notification.
export const LocalNotification = () => {
  PushNotification.localNotification({
    autoCancel: true,
    bigText:
      'This is local notification demo in React Native app. Only shown, when expanded.',
    subText: 'Send For Help - Local Notification',
    title: 'Send For Help Title',
    message: 'Expand me to see more',
    vibrate: true,
    vibration: 300,
    playSound: true,
    soundName: 'default',
    actions: ['Yes', 'No'],
  });
};

import { Alert } from 'react-native';
import PushNotification from 'react-native-push-notification';

class NotificationService {
  // TODO: I'm not sure this is working. I think it's never called.
  configurePushNotification = () => {
    PushNotification.configure({
      onRegister: function (token) {
        console.log('Push Notification Token registered :', token);
      },
      onNotification: function (notification) {
        if (notification.foreground) {
          // Alert.alert(JSON.stringify(notification.message));
        }
        console.log('NOTIFICATION:', notification);
        // notification.finish(PushNotificationIOS.FetchResult.NoData);
      },
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },
      popInitialNotification: true,
      requestPermissions: true,
    });
  };

  // This sends a LOCAL notification.
  sendLocalNotification = () => {
    PushNotification.localNotification({
      autoCancel: true,
      bigText: 'This is local notification. Emergency (x) feet away!',
      subText: 'Send For Help - Emergency!',
      title: 'There is an emergency in your area',
      message: 'Expand for more info',
      vibrate: true,
      vibration: 300,
      playSound: true,
      soundName: 'default',
      actions: ["I'm on my way!", "I can't help right now"],
    });
  };
}
export const notificationService = new NotificationService();
notificationService.configurePushNotification();

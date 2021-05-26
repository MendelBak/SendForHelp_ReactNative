import { Alert } from 'react-native';
import PushNotification from 'react-native-push-notification';

class NotificationService {
  // This sends a LOCAL notification.

  // {/* This button will send a local notification. Just placed here for testing. Place where needed on a screen.  */}
  //   {/* <View>
  //       <Button
  //         title={'Test Local Push Notification'}
  //         onPress={notificationService.sendLocalNotification}
  //       />
  //     </View> */}

  sendLocalNotification = () => {
    console.log('Sending local notification');
    PushNotification.localNotification({
      priority: 'max',
      invokeApp: true,
      visibility: 'public',
      importance: 'max',
      channelId: 'default_channel_id',
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

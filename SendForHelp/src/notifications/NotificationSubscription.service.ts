import PushNotification from 'react-native-push-notification';

class NotificationSubscriptionService {
  subscribe(target: string) {
    PushNotification.subscribeToTopic('target');
  }

}
export const notificationSubscriptionService = new NotificationSubscriptionService();

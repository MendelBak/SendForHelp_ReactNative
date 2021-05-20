import PushNotification from 'react-native-push-notification';

class NotificationSubscriptionService {
  subscribe(topic: string) {
    PushNotification.subscribeToTopic(topic);
    PushNotification.getChannels(function (channel_ids) {
      console.log(channel_ids); // ['channel_id_1']
    });
  }

}
export const notificationSubscriptionService = new NotificationSubscriptionService();

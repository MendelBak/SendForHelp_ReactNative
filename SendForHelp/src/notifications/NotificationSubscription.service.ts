import PushNotification from 'react-native-push-notification';

class NotificationSubscriptionService {
  subscribe(topic: string) {
    PushNotification.subscribeToTopic(topic);

    PushNotification.createChannel(
      {
        channelId: 'heroes', // (required)
        channelName: 'Hero Alerts', // (required)
        channelDescription:
          'A channel to notify Heroes of emergency events and updates',
        soundName: 'default',
        importance: 5,
        vibrate: true,
      },
      (created) =>
        console.log(
          `Creating Notification Channel. Channel already existed -> ${!created}`,
        ), // (optional) callback returns whether the channel was created, false means it already existed.
    );

    PushNotification.createChannel(
      {
        channelId: 'bystanders', // (required)
        channelName: 'Bystander Alerts', // (required)
        channelDescription:
          'A channel to notify Bystanders of emergency events and updates',
        soundName: 'default',
        importance: 5,
        vibrate: true,
      },
      (created) =>
        console.log(
          `Creating Notification Channel. Channel already existed -> ${!created}`,
        ), // (optional) callback returns whether the channel was created, false means it already existed.
    );

    PushNotification.getChannels((channel_ids) => {
      console.log('All channel IDs', channel_ids);
    });
  }
}
export const notificationSubscriptionService = new NotificationSubscriptionService();

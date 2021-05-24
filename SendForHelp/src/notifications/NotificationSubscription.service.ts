import PushNotification from 'react-native-push-notification';
import rootStores from '../stores';
import { USER_STORE } from '../stores/storesKeys';
import UserStore from '../stores/user.store';

const userStore: UserStore = rootStores[USER_STORE];
class NotificationSubscriptionService {
  constructor() {
    if (userStore.user.isHero) {
      this.createChannel(
        'bystanders',
        'Bystander Alerts',
        'DA channel to notify Bystanders of emergency events and updates',
        5,
      );
    }

    this.createChannel(
      'heroes',
      'Hero Alerts',
      'A channel to notify Heroes of emergency events and updates',
      5,
    );

    this.createChannel(
      'default_channel_id',
      'Default Notification Channel',
      'Default Notification Channel for app communtications',
      5,
    );

    PushNotification.getChannels((channel_ids) => {
      console.log('All channel IDs', channel_ids);
    });
  }

  subscribeToTopic(topic: string) {
    PushNotification.subscribeToTopic(topic);
  }

  createChannel(
    id: string,
    name: string,
    channelDescription: string,
    importance: number,
  ) {
    PushNotification.createChannel(
      {
        channelId: id, // (required)
        channelName: name, // (required)
        channelDescription: channelDescription,
        soundName: 'default',
        importance: importance,
        vibrate: true,
      },
      (created) =>
        console.log(
          `Creating Notification Channel. Channel already existed -> ${!created}`,
        ), // (optional) callback returns whether the channel was created, false means it already existed.
    );
  }
}
export const notificationSubscriptionService = new NotificationSubscriptionService();

// External
import { observer } from 'mobx-react-lite';
import React from 'react';
import { Text, View, StyleSheet, Switch } from 'react-native';

// Internal
import rootStores from '../../stores';
import { USER_STORE } from '../../stores/storesKeys';
import UserStore from '../../stores/user.store';

const userStore: UserStore = rootStores[USER_STORE];

const SettingsScreen = observer(
  ({ route, navigation }: { route: any; navigation: any }) => {
    const { user } = userStore;

    const toggleUserHeroStatus = () => {
      user.isHero = !user.isHero;
    };

    return (
      <View style={styles.container}>
        <Text>I WANT TO BE A HERO</Text>

        <Switch
          trackColor={{ false: '#767577', true: '#FF4C00' }}
          thumbColor={user.isHero ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleUserHeroStatus}
          value={user.isHero}
        />
      </View>
    );
  },
);

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'grey',
    backgroundColor: '#F0F0F3',
  },
});

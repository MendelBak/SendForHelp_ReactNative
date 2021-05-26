// External
import { observer } from 'mobx-react-lite';
import React from 'react';
import { Text, View, StyleSheet, Switch } from 'react-native';

// Internal
import rootStore from '../../stores/root.store';

const SettingsScreen = observer(
  ({ route, navigation }: { route: any; navigation: any }) => {
    const { userStore } = rootStore;
    const { user } = userStore;

    const toggleHeroStatus = () => {
      // user.isHero = !user.isHero;
      userStore.toggleHeroStatus();
    };

    return (
      <View style={styles.container}>
        <Text>I WANT TO BE A HERO</Text>

        <Switch
          trackColor={{ false: '#767577', true: '#FF4C00' }}
          thumbColor={user.isHero ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleHeroStatus}
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

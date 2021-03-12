// External
import {observer} from 'mobx-react-lite';
import React from 'react';
import {
  Text,
  View,
  Button,
  Pressable,
  Vibration,
  StyleSheet,
} from 'react-native';

// Internal
import EmergencyStore from '../stores/emergency.store';
import rootStores from '../stores';
import {EMERGENCY_STORE} from '../stores/storesKeys';
import {LocalNotification} from '../services/Notification.service';

const emergencyStore: EmergencyStore = rootStores[EMERGENCY_STORE];

const HomeScreen = observer(({navigation}: {navigation: any}) => {
  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <Text>Press a button to trigger the notification</Text>
        <View style={{marginTop: 20}}>
          <Button
            title={'Local Push Notification'}
            onPress={LocalNotification}
          />
        </View>
      </View>

      <View style={styles.emergencyStatus}>
        <Text>
          {emergencyStore.getIsEmergency
            ? 'EMERGENCY IN PROGRESS'
            : 'NO EMERGENCY'}
        </Text>
        <Text>
          {emergencyStore.getFirstResponders
            ? `FIRST RESPONDER: ${emergencyStore.getFirstResponders}`
            : ''}
        </Text>
      </View>
      <Pressable
        disabled={emergencyStore.getIsEmergency}
        onPress={() => (
          emergencyStore.initializeEmergency(),
          navigation.navigate('Symptoms'),
          Vibration.vibrate(200)
        )}
        style={styles.alertButton}>
        <View style={styles.alertButton}>
          <Text style={styles.alertButton__text}>SEND FOR HELP</Text>
        </View>
      </Pressable>
      <Pressable
        disabled={!emergencyStore.getIsEmergency}
        onPress={() => (emergencyStore.endEmergency(), Vibration.vibrate(200))}
        style={styles.cancelButton}>
        <View style={styles.cancelButton}>
          <Text style={styles.cancelButton__text}>CANCEL EMERGENCY</Text>
        </View>
      </Pressable>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Home!</Text>
        <Button
          title="Go to Settings"
          onPress={() => navigation.navigate('Location Details')}
        />
      </View>
    </View>
  );
});

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'grey',
    backgroundColor: 'white',
  },
  alertButton: {
    backgroundColor: '#ABCBA9',
    borderColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  emergencyStatus: {
    height: 50,
    width: '50%',
    alignItems: 'center',
    textAlignVertical: 'top',
    borderWidth: 2,
    borderColor: 'red',
    marginBottom: 100,
  },
  alertButton__text: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
    fontFamily: 'monospace',
  },
  cancelButton: {
    backgroundColor: 'green',
    borderColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    width: 200,
    marginTop: 20,
  },
  cancelButton__text: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
    fontFamily: 'monospace',
  },
});

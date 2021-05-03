// External
import { observer } from 'mobx-react-lite';
import React from 'react';
import {
  Text,
  View,
  Button,
  Pressable,
  Vibration,
  StyleSheet,
  Alert,
  Linking,
} from 'react-native';

// Internal
import EmergencyStore from '../stores/emergency.store';
import rootStores from '../stores';
import { EMERGENCY_STORE } from '../stores/storesKeys';
import { notificationService } from '../notifications/Notification.service';

const emergencyStore: EmergencyStore = rootStores[EMERGENCY_STORE];

const HomeScreen = observer(({ navigation }: { navigation: any }) => {
  return (
    <View style={styles.container}>
      <View>
        <View>
          <Button
            title={'Test Local Push Notification'}
            onPress={notificationService.sendLocalNotification}
          />
        </View>
      </View>
      {emergencyStore.getIsEmergency ? (
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
      ) : null}

      <Pressable
        disabled={emergencyStore.getIsEmergency}
        onPress={() => {
          emergencyStore.initializeEmergency().then(() => {
            // TODO: I want to move this alert to trigger when I receive the push notificaation, which will prove the event made it to the DB.
            // Need to figure out how to subscribe all relevant parties to this a particular emergency, to receive updates on it.
            Alert.alert(
              'Your call for help has been sent!',
              'Please call 911 while waiting for a rescuer to respond',
              [
                {
                  text: 'Add Details',
                  onPress: () => (
                    navigation.navigate('Symptoms'), Vibration.vibrate(200)
                  ),
                  style: 'cancel',
                },
                {
                  text: 'Call 911',
                  onPress: () => (
                    // TODO: Add police phone number here. Localize for geographic location.
                    Linking.openURL('tel:000'), Vibration.vibrate(200)
                  ),
                  style: 'cancel',
                },
              ],
              {
                cancelable: true,
              },
            );
          }),
            Vibration.vibrate(200);
        }}
        style={styles.alertButton}>
        <View style={styles.alertButton}>
          <Text style={styles.alertButton__text}>SEND FOR HELP</Text>
        </View>
      </Pressable>

      {emergencyStore.getIsEmergency ? (
        <Pressable
          disabled={!emergencyStore.getIsEmergency}
          onPress={() => (
            emergencyStore.endEmergency(), Vibration.vibrate(200)
          )}
          style={styles.cancelButton}>
          <View style={styles.cancelButton}>
            <Text style={styles.cancelButton__text}>CANCEL EMERGENCY</Text>
          </View>
        </Pressable>
      ) : null}
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

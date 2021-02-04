import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { Linking, Pressable, StyleSheet, Vibration, Text, View } from 'react-native';

import rootStores from '../stores';
import EmergencyStore from '../stores/emergency.store';
import { EMERGENCY_STORE } from '../stores/storesKeys';

const emergencyStore: EmergencyStore = rootStores[EMERGENCY_STORE];

const FirstResponderScreen = observer(() => {
  const symptoms = emergencyStore.getSymptoms;

  return (
    <View style={styles.container}>
      <View style={styles.emergencyStatus}>
        <Text>
          {emergencyStore.getIsEmergency
            ? 'EMERGENCY IN PROGRESS'
            : 'NO EMERGENCY'}
        </Text>
        <Text>
          {emergencyStore.getFirstResponder
            ? `FIRST RESPONDER: ${emergencyStore.getFirstResponder}`
            : ''}
        </Text>
      </View>

      <Pressable style={styles.welcome}>
        <Text>Location of Emergency</Text>
        <Text>Latitude: {emergencyStore.getEmergencyLocation.latitude}</Text>
        <Text>Longitude: {emergencyStore.getEmergencyLocation.longitude}</Text>
      </Pressable>

      <Pressable
        disabled={
          !emergencyStore.getIsEmergency ||
          !emergencyStore.getEmergencyLocation.latitude ||
          !emergencyStore.getEmergencyLocation.longitude
        }
        onPress={() => (
          emergencyStore.addFirstResponder('Mendel'),
          Vibration.vibrate(200),
          Linking.openURL(
            `https://www.google.com/maps/search/?api=1&query=${emergencyStore.getEmergencyLocation.latitude}+${emergencyStore.getEmergencyLocation.longitude}`
          )
        )}
        style={styles.alertButton}
      >
        <View style={styles.alertButton}>
          <Text style={styles.alertButton__text}>I'M ON MY WAY!</Text>
        </View>
      </Pressable>

      {emergencyStore.getIsEmergency ? (
        <View
          style={{
            backgroundColor: 'grey',
            width: 'auto',
            height: 'auto',
            padding: 10,
          }}
        >
          <Text style={{ color: 'white' }}>
            -- Choking: {symptoms.choking.toString()}
          </Text>
          <Text>-- Drowning: {symptoms.drowning.toString()}</Text>
          <Text>-- Hemmoraging: {symptoms.hemmoraging.toString()}</Text>
          <Text>-- Blunt Trauma: {symptoms.bluntTrauma.toString()}</Text>
          <Text>-- Other: {symptoms.other.toString()}</Text>
        </View>
      ) : null}
    </View>
  );
});

export default FirstResponderScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'grey',
    backgroundColor: 'white',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    borderWidth: 2,
    color: 'black',
    backgroundColor: 'grey',
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
  alertButton__text: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
    fontFamily: 'monospace',
  },
  emergencyStatus: {
    height: 50,
    width: '50%',
    alignItems: 'center',
    textAlignVertical: 'top',
    borderWidth: 2,
    borderColor: 'red',
    marginBottom: 100,
    color: 'grey',
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

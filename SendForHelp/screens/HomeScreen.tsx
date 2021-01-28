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

// export default function HomeScreen({navigation}: {navigation: any}) {
//   return (
// <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
//   <Text>Home!</Text>
//   <Button
//     title="Go to Settings"
//     onPress={() => navigation.navigate('Details')}
//   />
// </View>
//   );
// }

// Internal
import EmergencyStore from '../stores/emergency.stores';
import rootStores from '../stores';
import {EMERGENCY_STORE} from '../stores/storesKeys';

const emergencyStore: EmergencyStore = rootStores[EMERGENCY_STORE];

const HomeScreen = observer(({navigation}: {navigation: any}) => {
  return (
    <View style={styles.container}>
      <View style={styles.emergencyStatus}>
        <Text>
          {emergencyStore.getEmergency
            ? 'EMERGENCY IN PROGRESS'
            : 'NO EMERGENCY'}
        </Text>
        <Text>
          {emergencyStore.getFirstResponder
            ? `FIRST RESPONDER: ${emergencyStore.getFirstResponder}`
            : ''}
        </Text>
      </View>
      <Pressable
        disabled={emergencyStore.getEmergency}
        onPress={() => (
          emergencyStore.declareEmergency(),
          navigation.navigate('Symptoms'),
          Vibration.vibrate(200)
        )}
        style={styles.alertButton}>
        <View style={styles.alertButton}>
          <Text style={styles.alertButton__text}>SEND FOR HELP</Text>
        </View>
      </Pressable>

      <Pressable
        disabled={!emergencyStore.getEmergency}
        onPress={() => (
          emergencyStore.cancelEmergency(), Vibration.vibrate(200)
        )}
        style={styles.cancelButton}>
        <View style={styles.cancelButton}>
          <Text style={styles.cancelButton__text}>CANCEL EMERGENCY</Text>
        </View>
      </Pressable>

      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Home!</Text>
        <Button
          title="Go to Settings"
          onPress={() => navigation.navigate('Details')}
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

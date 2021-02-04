import {observer} from 'mobx-react-lite';
import * as React from 'react';
import {Pressable, StyleSheet, Vibration, Text, View} from 'react-native';

import rootStores from '../stores';
import EmergencyStore from '../stores/emergency.store';
import {EMERGENCY_STORE} from '../stores/storesKeys';
import SymptomsModel from '../models/symptoms.model';

const emergencyStore: EmergencyStore = rootStores[EMERGENCY_STORE];

const SymptomsScreen = observer(({navigation}: {navigation: any}) => {
  const symptoms: SymptomsModel = new SymptomsModel();

  return (
    <View style={styles.container}>
      <View style={styles.card__container}>
        <Pressable
          onPress={() => (
            Vibration.vibrate(20), (symptoms.choking = !symptoms.choking)
          )}
          style={styles.card}>
          <Text>CHOKING</Text>
        </Pressable>

        <Pressable
          onPress={() => (
            Vibration.vibrate(20), (symptoms.drowning = !symptoms.drowning)
          )}
          style={styles.card}>
          <Text>DROWING</Text>
        </Pressable>

        <Pressable
          onPress={() => (
            Vibration.vibrate(20),
            (symptoms.hemmoraging = !symptoms.hemmoraging)
          )}
          style={styles.card}>
          <Text>BLEEDING</Text>
        </Pressable>

        <Pressable
          onPress={() => (
            Vibration.vibrate(20),
            (symptoms.bluntTrauma = !symptoms.bluntTrauma)
          )}
          style={styles.card}>
          <Text>HIT BY HEAVY OBJECT</Text>
        </Pressable>

        <Pressable
          onPress={() => (
            Vibration.vibrate(20), (symptoms.other = !symptoms.other)
          )}
          style={styles.card}>
          <Text>OTHER</Text>
        </Pressable>

        <Pressable
          onPress={() => (
            Vibration.vibrate(20),
            emergencyStore.updateSymptoms(symptoms),
            navigation.navigate('First Responder')
          )}
          style={styles.card}>
          <Text>CONTINUE</Text>
        </Pressable>
      </View>
    </View>
  );
});

export default SymptomsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 2,
    borderColor: 'grey',
    backgroundColor: 'white',
  },
  card__container: {
    backgroundColor: 'white',
    alignItems: 'center',
    // alignContent: 'space-between',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    height: '100%',
  },
  card: {
    backgroundColor: 'grey',
    height: '20%',
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'red',
    marginBottom: 100,
  },
});

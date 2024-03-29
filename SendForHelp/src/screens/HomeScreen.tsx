// External
import { observer } from 'mobx-react-lite';
import React, { useRef } from 'react';
import {
  Text,
  View,
  Pressable,
  Vibration,
  StyleSheet,
  Animated,
  Easing,
} from 'react-native';

import rootStore from '../stores/root.store';

const HomeScreen = observer(
  ({ route, navigation }: { route: any; navigation: any }) => {
    const { emergencyStore } = rootStore;

    const animationValue = useRef(new Animated.Value(0)).current;
    const scaleValue = useRef(0);

    if (route?.params) {
      const { resetEmergencyAnimation = false } = route.params;
      if (resetEmergencyAnimation === true) animationValue.setValue(0);
    }

    const runAnimationAndBeginEmergency = () => {
      scaleValue.current = scaleValue.current === 0 ? 1 : 0;

      Animated.timing(animationValue, {
        toValue: 2,
        // easing:Easing.elastic(1),
        // easing: Easing.bezier(0.95, 0.05, 0.795, 0.035),
        // easing: Easing.bezier(0.785, 0.135, 0.15, 0.86),
        easing: Easing.bezier(0.785, 0.135, 0.15, 0.86),
        duration: 3000,

        useNativeDriver: true,
      }).start(({ finished }) => {
        emergencyStore.initializeEmergency();
      });
    };

    const runResetAnimation = () => {
      scaleValue.current = scaleValue.current === 0 ? 1 : 0;

      Animated.timing(animationValue, {
        toValue: 0,
        // bounce: 10,
        // easing: Easing.back(0.3),
        // easing: Easing.bezier(0.075, 0.82, 0.165, 1.0),
        easing: Easing.inOut(Easing.elastic(0.1)),
        // easing: Easing.in(Easing.elastic(1)),
        duration: 2000,
        useNativeDriver: true,
      }).start(({ finished }) => {
        if (emergencyStore.getIsEmergency) {
          emergencyStore.endEmergency();
        }
      });
    };

    return (
      <View style={styles.container}>
        <Animated.View
          style={{
            height: 200,
            width: 200,
            position: 'absolute',
            backgroundColor: '#FF4C00',
            borderRadius: 100,
            transform: [
              {
                scale: animationValue.interpolate({
                  inputRange: [0, 3],
                  outputRange: [1, 7],
                }),
              },
            ],
          }}
        />

        <Pressable
          onPress={() => {
            runResetAnimation();
          }}
          android_ripple={{ color: '#ff4C00', borderless: true }}
          onLongPress={async () => {
            runAnimationAndBeginEmergency();

            // emergencyStore.initializeEmergency().then(() => {
            // TODO: I want to move this alert to trigger when I receive the push notification, which will prove the event made it to the DB.
            // Need to figure out how to subscribe all relevant parties to this a particular emergency, to receive updates on it.
            // Alert.alert(
            //   'Your call for help has been sent!',
            //   'Please call 911 while waiting for a rescuer to respond',
            //   [
            //     {
            //       text: 'Add Details',
            //       onPress: () => (
            //         navigation.navigate('Symptoms'), Vibration.vibrate(200)
            //       ),
            //       style: 'cancel',
            //     },
            //     {
            //       text: 'Call 911',
            //       onPress: () => (
            //         // TODO: Add police phone number here. Localize for geographic location.
            //         Linking.openURL('tel:000'), Vibration.vibrate(200)
            //       ),
            //       style: 'cancel',
            //     },
            //   ],
            //   {
            //     cancelable: true,
            //   },
            // );
            // }),
            Vibration.vibrate(200);
          }}
          style={styles.alertButton}>
          <View style={styles.alertButton}>
            <Text style={styles.alertButton__text}>
              {emergencyStore.getIsEmergency ? 'CANCEL' : 'GET HELP'}
            </Text>
          </View>
        </Pressable>
      </View>
    );
  },
);

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'grey',
    backgroundColor: '#F0F0F3',
  },
  alertButton: {
    backgroundColor: '#F0F0F3',
    borderColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    width: 200,
    height: 200,
    borderRadius: 100,
    elevation: 5,
  },
  alertButton__text: {
    fontSize: 35,
    color: '#FF4C00',
    fontFamily: 'bebas',
  },
});

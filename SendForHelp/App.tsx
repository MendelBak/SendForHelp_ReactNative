// In App.js in a new project

import * as React from 'react';
import {View, Button, Text, PushNotificationIOS, Alert} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// You can import Ionicons from @expo/vector-icons/Ionicons if you use Expo or
// react-native-vector-icons/Ionicons otherwise.
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from './src/screens/HomeScreen';
import DetailsScreen from './src/screens/LocationDetails';
import FirstResponderScreen from './src/screens/FirstResponderScreen';
import SymptomsScreen from './src/screens/SymptomsScreen';
import LocationDetailsScreen from './src/screens/LocationDetails';
import PushNotification from 'react-native-push-notification';
import LoginScreen from './src/screens/LoginScreen';
import SignupScreen from './src/screens/SignupScreen';

// TODO: Need to move these out of here. General cleanup of notifications is needed.
// Function for Local Notification
const localPushNotification = () => {
  PushNotification.localNotification({
    title: 'Local Notification',
    message: 'This is a local notification example',
  });
};

PushNotification.subscribeToTopic('emergency');

//Push Notification configuration
PushNotification.configure({
  onRegister: function (token) {
    console.log('TOKEN:', token);
  },
  onNotification: function (notification) {
    if (notification.foreground) {
      // Alert.alert(JSON.stringify(notification.message));
    }
    console.log('NOTIFICATION:', notification);
    // notification.finish(PushNotificationIOS.FetchResult.NoData);
  },
  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },
  popInitialNotification: true,
  requestPermissions: true,
});

export default function App() {
  // TODO: This should be in a store. (user.store.ts?) Need to make user.mode.ts anyway.
  const isSignedIn: boolean = false;

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName = 'information-circle';

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
        }}>
        {isSignedIn ? (
          <>
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Symptoms" component={SymptomsScreen} />
            <Tab.Screen
              name="Location Details"
              component={LocationDetailsScreen}
            />
            <Tab.Screen
              name="First Responder"
              component={FirstResponderScreen}
            />
          </>
        ) : (
          <>
            <Tab.Screen name="Login" component={LoginScreen} />
            <Tab.Screen name="Signup" component={SignupScreen} />
          </>
        )}
      </Tab.Navigator>
    </NavigationContainer>
  );
}

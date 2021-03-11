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
import HomeScreen from './screens/HomeScreen';
import DetailsScreen from './screens/LocationDetails';
import FirstResponderScreen from './screens/FirstResponderScreen';
import SymptomsScreen from './screens/SymptomsScreen';
import LocationDetailsScreen from './screens/LocationDetails';
import PushNotification from 'react-native-push-notification';

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
    if(notification.foreground)
    {
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
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Symptoms" component={SymptomsScreen} />
        <Tab.Screen name="Location Details" component={LocationDetailsScreen} />
        <Tab.Screen name="First Responder" component={FirstResponderScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

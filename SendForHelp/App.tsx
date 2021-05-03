// In App.js in a new project

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { navigationRef } from './RootNavigation';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// You can import Ionicons from @expo/vector-icons/Ionicons if you use Expo or
// react-native-vector-icons/Ionicons otherwise.
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from './src/screens/HomeScreen';
import FirstResponderScreen from './src/screens/FirstResponderScreen';
import SymptomsScreen from './src/screens/SymptomsScreen';
import LocationDetailsScreen from './src/screens/LocationDetails';
import LoginScreen from './src/screens/LoginScreen';
import SignupScreen from './src/screens/SignupScreen';
import { notificationSubscriptionService } from './src/notifications/NotificationSubscription.service';
import rootStores from './src/stores';
import EmergencyStore from './src/stores/emergency.store';
import { EMERGENCY_STORE } from './src/stores/storesKeys';
import { observer } from 'mobx-react-lite';

const emergencyStore: EmergencyStore = rootStores[EMERGENCY_STORE];

const App = observer(() => {
  // TODO: This should be in a store. (user.store.ts?) Need to make user.model.ts anyway.
  const isSignedIn: boolean = true;

  // TODO: Need to make notification subscriptions dependent on what role the user is. Should probably also be in the user.store
  notificationSubscriptionService.subscribe('emergency');

  const TabNavigator = () => {
    return (
      <Tab.Navigator
        // screenOptions={({ route }) => ({
        // tabBarIcon: ({ focused, color, size }) => {
        //   let iconName = 'information-circle';
        //   // You can return any component that you like here!
        //   return <Ionicons name={iconName} size={size} color={color} />;
        // },
        // })}
        tabBarOptions={{
          activeTintColor: 'red',
          inactiveTintColor: 'gray',
        }}>
        {isSignedIn ? (
          <>
            <Tab.Screen
              name="Home"
              component={HomeScreen}
              options={{
                tabBarIcon: ({ focused, color, size }) => {
                  let iconName = 'medkit-outline';

                  return <Ionicons name={iconName} size={size} color={color} />;
                },
              }}
            />
            <Tab.Screen
              name="Symptoms"
              component={SymptomsScreen}
              options={{
                tabBarIcon: ({ focused, color, size }) => {
                  let iconName = 'list-outline';

                  return <Ionicons name={iconName} size={size} color={color} />;
                },
              }}
            />
            <Tab.Screen
              name="Location Details"
              component={LocationDetailsScreen}
              options={{
                tabBarIcon: ({ focused, color, size }) => {
                  let iconName = 'document-text-outline';

                  return <Ionicons name={iconName} size={size} color={color} />;
                },
              }}
            />
            <Tab.Screen
              name="First Responder"
              component={FirstResponderScreen}
              options={{
                tabBarIcon: ({ focused, color, size }) => {
                  let iconName = 'people-outline';

                  return <Ionicons name={iconName} size={size} color={color} />;
                },
              }}
            />
          </>
        ) : (
          <>
            <Tab.Screen
              name="Login"
              component={LoginScreen}
              options={{
                tabBarIcon: ({ focused, color, size }) => {
                  let iconName = 'log-in-outline';

                  return <Ionicons name={iconName} size={size} color={color} />;
                },
              }}
            />
            <Tab.Screen
              name="Signup"
              component={SignupScreen}
              options={{
                tabBarIcon: ({ focused, color, size }) => {
                  let iconName = 'log-out-outline';

                  return <Ionicons name={iconName} size={size} color={color} />;
                },
              }}
            />
          </>
        )}
      </Tab.Navigator>
    );
  };

  const displayRescuer = (): string => {
    if (
      emergencyStore.getIsEmergency &&
      !emergencyStore.getFirstResponders.length
    ) {
      return 'Send For Help - Looking For Rescuer...';
    } else if (
      emergencyStore.getIsEmergency &&
      emergencyStore.getFirstResponders.length
    ) {
      return `Send For Help - Primary Rescuer: ${emergencyStore.getFirstResponders[0]}`;
    }

    return 'Send For Help';
  };

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator>
        <Stack.Screen
          name={displayRescuer()}
          component={TabNavigator}
          options={
            emergencyStore.getIsEmergency
              ? {
                  headerStyle: { backgroundColor: 'red' },
                  headerTitleStyle: { color: 'white', fontWeight: 'bold' },
                }
              : undefined
          }
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
});

export default App;

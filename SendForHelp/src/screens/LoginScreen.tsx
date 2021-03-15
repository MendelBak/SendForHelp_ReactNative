// External
import { observer } from 'mobx-react-lite';
import React from 'react';
import { Text, View, Button, StyleSheet, Alert, Linking } from 'react-native';
import InAppBrowser from 'react-native-inappbrowser-reborn';
import { getDeepLink } from '../../utilities';

const URI = 'http://3079bba2004c.ngrok.io';

const LoginScreen = observer(({ navigation }: { navigation: any }) => {
  const handeOAuthLogin = async () => {
    const deepLink = getDeepLink('callback');
    // const url = `http://3079bba2004c.ngrok.io/auth/google/redirect=${deepLink}`;

    console.log(`attempting to login ${URI}/auth/google/login`);
    let redirectUrl = await Linking.getInitialURL();
    // this should change depending on where the server is running
    let authUrl = `${URI}/auth/google/login`;

    try {
      if (await InAppBrowser.isAvailable()) {
        InAppBrowser.openAuth(
          `${URI}/auth/google/login`,
          // `${URI}/auth/google/redirect`,
          deepLink,
          {
            // iOS Properties
            ephemeralWebSession: false,
            // Android Properties
            showTitle: false,
            enableUrlBarHiding: true,
            enableDefaultShare: false,
            // forceCloseOnRedirection: false,
            showInRecents: true,
          },
        ).then((response) => {
          console.log('🚀 ~ ).then ~ response', response);
          if (response.type === 'success' && response.url) {
            Linking.openURL(response.url);
          }

          // if (response.type === 'success' && response.url) {
          //   Linking.openURL(response.url);
          // }
        });
      } else {
        console.log('🚀 ~ ).else condition hit');
        Linking.openURL(`${URI}/auth/google/login`);
      }
    } catch (error) {
      console.log('🚀 ~ handeOAuthLogin ~ error', error);
      Linking.openURL(`${URI}/auth/google/login`);
    }
  };
  return (
    <View style={styles.container}>
      <Text>Please Login</Text>
      <View style={{ marginTop: 20 }}>
        <Button title={'LOGIN'} onPress={() => handeOAuthLogin()} />
      </View>
    </View>
  );
});

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'grey',
    backgroundColor: 'white',
  },
});

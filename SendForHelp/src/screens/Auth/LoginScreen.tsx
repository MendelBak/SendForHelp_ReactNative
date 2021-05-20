// External
import { observer } from 'mobx-react-lite';
import React from 'react';
import { Text, View, Button, StyleSheet, Alert, Linking } from 'react-native';
import InAppBrowser from 'react-native-inappbrowser-reborn';
import { getDeepLink } from '../../../utilities';
import { URI } from '../../../URI';

// const URI = 'http://54.242.127.157:3000';

const LoginScreen = observer(({ navigation }: { navigation: any }) => {
  const handeOAuthLogin = async () => {
    const deepLink = getDeepLink();
    console.log("🚀 ~ handeOAuthLogin ~ deepLink", deepLink)
    // const url = `http://3079bba2004c.ngrok.io/auth/google/redirect=${deepLink}`;

    // console.log(`attempting to login ${URI}/auth/google/login`);
    console.log(`attempting to login ${URI}/auth/google/redirect`);
    let redirectUrl = await Linking.getInitialURL();
    // this should change depending on where the server is running
    let authUrl = `${URI}/auth/google/login`;

    try {
      if (await InAppBrowser.isAvailable()) {
        InAppBrowser.openAuth(
          // `${URI}/auth/google/login`,
          `${URI}/auth/google/login`,
          // deepLink,
          "sendforhelp://my-host",
          {
            // iOS Properties
            ephemeralWebSession: false,
            // Android Properties
            showTitle: false,
            enableUrlBarHiding: true,
            enableDefaultShare: false,
            // forceCloseOnRedirection: false,
            showInRecents: true,
            animations: {
              startEnter: 'slide_in_right',
              startExit: 'slide_out_left',
              endEnter: 'slide_in_left',
              endExit: 'slide_out_right',
            },
            headers: {
              'my-custom-header': 'my custom header value',
            },
          },
        ).then((response) => {
          console.log('🚀 ~ ).then ~ response', response);
          if (response.type === 'success' && response.url) {
            console.log('response url', response.url)
            Linking.openURL(response.url);
          }
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

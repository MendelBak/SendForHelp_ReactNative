// External
import axios from 'axios';
import {observer} from 'mobx-react-lite';
import React from 'react';
import {Text, View, Button, StyleSheet, Alert} from 'react-native';

const URI = 'http://9d7696f10407.ngrok.io';


const LoginScreen = observer(({navigation}: {navigation: any}) => {
  const loginTest = () => {
    console.log(`attempting to login ${URI}/auth/google/login`)
    axios
      .get(`${URI}/auth/google/login`)
      .then(async (response) => {
        return response.data;
      })
      .catch((err) => {
        console.log('Error getting emergencies', err);
      });
  }
  return (
    <View style={styles.container}>
      <Text>Please Login</Text>
      <View style={{marginTop: 20}}>
        <Button
          title={'LOGIN'}
          onPress={() => loginTest()}
        />
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

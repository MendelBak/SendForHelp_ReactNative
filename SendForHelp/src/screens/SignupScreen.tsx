// External
import {observer} from 'mobx-react-lite';
import React from 'react';
import {Text, View, Button, StyleSheet, Alert} from 'react-native';

// Internal

const SignupScreen = observer(({navigation}: {navigation: any}) => {
  return (
    <View style={styles.container}>
      <Text>Signup For Send For Help</Text>
      <View style={{marginTop: 20}}>
        <Button
          title={'SIGN UP'}
          onPress={() => Alert.alert('Need to add signup flow here. ')}
        />
      </View>
    </View>
  );
});

export default SignupScreen;

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

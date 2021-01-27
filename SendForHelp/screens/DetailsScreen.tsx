import React from 'react';
import { Text, View, Button } from 'react-native';

export default function DetailsScreen({navigation}: {navigation: any}) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Details!</Text>
        <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
      </View>
    );
  }
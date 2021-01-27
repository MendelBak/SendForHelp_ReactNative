import React from 'react';
import { Text, View, Button } from 'react-native';

export default function HomeScreen({navigation}: {navigation: any}) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Home!</Text>
        <Button
          title="Go to Settings"
          onPress={() => navigation.navigate('Details')}
        />
      </View>
    );
  }
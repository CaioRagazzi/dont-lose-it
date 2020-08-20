import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';

import HomeScreen from '../screens/home';
import ItemScreen from '../screens/item';
import ImageScreen from '../screens/image';

export type RootStackParamList = {
  MyList: undefined;
  Item: undefined;
  Image: { uri: string; deleteImage: Function };
};

export const Navigation = () => {
  const Stack = createStackNavigator<RootStackParamList>();

  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" />
      <Stack.Navigator initialRouteName="MyList">
        <Stack.Screen name="MyList" component={HomeScreen} options={{}} />
        <Stack.Screen name="Item" component={ItemScreen} />
        <Stack.Screen name="Image" component={ImageScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import HomeScreen from "../screens/home";
import ItemScreen from "../screens/item";

export type RootStackParamList = {
  MyList: undefined;
  Item: undefined;
};

export const Navigation = () => {
  const Stack = createStackNavigator<RootStackParamList>();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MyList">
        <Stack.Screen name="MyList" component={HomeScreen} />
        <Stack.Screen name="Item" component={ItemScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

// navigation/RootNavigator.tsx

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Splash from '../screens/Splash';
import Login from '../screens/Login';
import Verify from '../screens/Verify';
import Dashboard from '../screens/Dashboard';
import {RootStackParamList} from './types';
import SignupScreen from '../screens/Signup';
import GoLive from '../screens/GoLive';
import WatchLive from '../screens/PlayHls';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Verify" component={Verify} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="GoLive" component={GoLive} />
        <Stack.Screen name="WatchLive" component={WatchLive} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

import React from 'react';
import { View, Text, Button } from 'react-native';
import { clearSession } from '../utills/storage';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';

type DashboardScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Dashboard'>;

type Props = {
  navigation: DashboardScreenNavigationProp;
};

export default function Dashboard({ navigation }: Props) {
  const logout = async () => {
    await clearSession();
    navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Welcome to the Dashboard!</Text>
      <Button title="Logout" onPress={logout} />
    </View>
  );
}

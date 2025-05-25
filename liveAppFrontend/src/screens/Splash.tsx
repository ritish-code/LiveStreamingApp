import React, { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import api from '../api/axiosInstance';
import { getSession, clearSession } from '../utills/storage';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function Splash() {
  const navigation = useNavigation<NavigationProp>();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const { email, accessToken } = await getSession();
        if (!email || !accessToken) throw new Error('Missing credentials');

        const deviceId = await DeviceInfo.getUniqueId();
        const res = await api.post('/validate-session', { email, accessToken, deviceId });

        if (res.data?.goodToGo) {
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: 'Dashboard' }],
            }),
          );
        } else {
          await clearSession();
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: 'Login' }],
            }),
          );
        }
      } catch {
        await clearSession();
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'Login' }],
          }),
        );
      }
    };

    checkSession();
  }, [navigation]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" />
    </View>
  );
}

import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import api from '../api/axiosInstance';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import DeviceInfo from 'react-native-device-info';

type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

type Props = {
  navigation: LoginScreenNavigationProp;
};

export default function Login({ navigation }: Props) {
  console.log("asjkasj")
  const [email, setEmail] = useState('');
  const requestOtp = async () => {
    try {
      console.log("sasbajsbs")
      const deviceId = await DeviceInfo.getUniqueId();
      console.log("email", email, deviceId);
      await api.post('/auth/request-otp', { email, deviceId });
      navigation.navigate('Verify', { email });
    } catch (err) {
      Alert.alert('Failed', 'Unable to send OTP')
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Enter your email:</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        style={{ borderWidth: 1, marginVertical: 10, padding: 8 }}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        placeholder="example@mail.com"
      />
      <Button title="Send OTP" onPress={requestOtp} />
    </View>
  );
}

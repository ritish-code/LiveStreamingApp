import React, { useState } from 'react';
import { View, TextInput, Button, Alert, ActivityIndicator } from 'react-native';
import api from '../api/axiosInstance';
import DeviceInfo from 'react-native-device-info';
import { storeUserSession } from '../utills/storage';
import { RootStackParamList } from '../navigation/types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';


type Props = NativeStackScreenProps<RootStackParamList, 'Verify'>;


export default function Verify({ route, navigation }: Props) {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const { email } = route.params;

  const verifyOtp = async () => {
    if (!otp.trim()) {
      Alert.alert('Please enter the OTP');
      return;
    }

    try {
      setLoading(true);
      const deviceId = await DeviceInfo.getUniqueId();
      const res = await api.post('/auth/verify-otp', { email, otp, deviceId });
console.log("res", res);
      if (res.status === 200) { 
        console.log('5665')
        if(res.data.token){
await storeUserSession(email, res.data.token);
        navigation.reset({ index: 0, routes: [{ name: 'Dashboard' }] });
        } else if(res.data.redirectToSignup){
            navigation.navigate('Signup', { email });
        }
        
      } else {
        Alert.alert('Invalid OTP');
      }
    } catch (err) {
      console.log('OTP verification error:', err);
      Alert.alert('Verification Failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        value={otp}
        onChangeText={setOtp}
        placeholder="Enter OTP"
        keyboardType="numeric"
        style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
      />
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <Button title="Verify" onPress={verifyOtp} />
      )}
    </View>
  );
}

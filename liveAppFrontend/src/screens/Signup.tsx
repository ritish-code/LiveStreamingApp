import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
  PermissionsAndroid,
  Platform,
  Alert,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoding';
import DeviceInfo from 'react-native-device-info';
import api from '../api/axiosInstance';
import { useNavigation } from '@react-navigation/native';

Geocoder.init('AIzaSyDPV9jmoLYsbrevhjxSbYfMB6sYKCqqXk4');

const SignupScreen = ({ route }) => {
  const navigation = useNavigation();
  const { email } = route.params;
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [locationFetched, setLocationFetched] = useState(false);

  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true;
  };

  const fetchLocation = async () => {
    const hasPermission = await requestLocationPermission();
    if (!hasPermission) return;

    Geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const geoResponse = await Geocoder.from(latitude, longitude);
          const address = geoResponse.results[0].address_components;

          const getComponent = (type) =>
            address.find((component) => component.types.includes(type))?.long_name || '';

          setCity(getComponent('locality') || getComponent('administrative_area_level_1'));
          setCountry(getComponent('country'));
          setLocationFetched(true);
        } catch (error) {
          console.error('Geocoding error:', error);
        }
      },
      (error) => {
        console.error('Location error:', error);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  const handleSignup = async () => {
    const deviceId = await DeviceInfo.getUniqueId();

    try {
      const res = await api.post('/auth/signup', {
        email,
        name,
        country,
        location: `${city}, ${country}`,
        city,
        image: '',
        deviceId,
      });

      if (res.status === 201) {
        Alert.alert('Signup Successful', 'OTP sent to your email.');
        navigation.navigate('Verify', { email });
      } else {
        Alert.alert('Signup Failed', res.data.message || 'Try again');
      }
    } catch (err) {
      console.error('Signup error:', err);
      Alert.alert('Error', 'Signup failed');
    }
  };

  return (
    <View style={styles.container}>
      <Text>Email</Text>
      <TextInput style={styles.input} value={email} editable={false} />

      <Text>Name</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} />

      <Text>Phone Number (Optional)</Text>
      <TextInput style={styles.input} value={phoneNumber} onChangeText={setPhoneNumber} keyboardType="phone-pad" />

      <Text>City</Text>
      <TextInput style={styles.input} value={city} editable={false} />

      <Text>Country</Text>
      <TextInput style={styles.input} value={country} editable={false} />

      <Button title="Fetch Location" onPress={fetchLocation} />
      {locationFetched && <Text style={styles.success}>Location fetched successfully!</Text>}

      <Button title="Sign Up" onPress={handleSignup} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    gap: 12,
    backgroundColor: '#fff',
  },
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    padding: 10,
    borderRadius: 5,
  },
  success: {
    marginTop: 10,
    color: 'green',
  },
});

export default SignupScreen;
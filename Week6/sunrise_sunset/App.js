import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Alert } from 'react-native';

const url = 'https://geocode.maps.co/search?q=';
const url2 = 'https://api.sunrisesunset.io/json?';

export default function App() {
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [address, setAddress] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [info, setInfo] = useState({});

  const checkAddress = async () => {
    try {
      if (address === '') {
        throw new Error('Please input an address');
      }
      const response = await fetch(url + address + "&api_key=66271fc84782d858537248lhzf60657");
      const data = await response.json();
      setDisplayName(data[0].display_name);
      setLatitude(data[0].lat);
      setLongitude(data[0].lon);
    } catch (error) {
      console.error(error);
      Alert.alert("Error", error?.message ?? "An error occurred",
        [{ text: 'OK', }]
      );
    } finally {
      console.log('After fetch address')
    }
  }

  useEffect(() => {
    const fetchSunriseSunset = async () => {
      try {
        const response = await fetch(url2 + 'lat=' + latitude + '&lng=' + longitude);
        const data = await response.json();
        const info = {
          sunrise: data.results.sunrise,
          sunset: data.results.sunset,
          timezone: data.results.timezone,
        }
        setInfo(info);
      } catch (error) {
        console.error(error);
      } finally {
        console.log('After fetch sunrise and sunset')
      }
    }
    if (latitude && longitude) {
      fetchSunriseSunset();
    }
  }, [latitude, longitude]);

  return (
<View style={styles.container}>
  <Text style={styles.label}>Enter location</Text>
  <TextInput
  style={styles.input}
  value={address}
  onChangeText={setAddress}
  placeholder='Please input a location'
  onSubmitEditing={checkAddress}
  autoCapitalize="none"
  autoCorrect={false}
  keyboardType="ascii-capable" 
/>

  <Text>&nbsp;</Text>
  <Text>Name: {displayName}</Text>
  <Text>Longitude: {longitude}</Text>
  <Text>Latitude: {latitude}</Text>
  <Text>Sunrise: {info.sunrise}</Text>
  <Text>Sunset: {info.sunset}</Text>
  <Text>Timezone: {info.timezone}</Text>
</View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: 200,
  },
});

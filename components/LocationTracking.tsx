// components/LocationTracking.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, Button, Image, StyleSheet } from 'react-native';
import * as Location from 'expo-location';
import * as ImagePicker from 'expo-image-picker';

const LocationTracking: React.FC = () => {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [hasPermission, setHasPermission] = useState<boolean>(false);
  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
      setHasPermission(true);
    })();
  }, []);

  const getLocation = async () => {
    try {
      let { coords } = await Location.getCurrentPositionAsync();
      setLocation(coords);
    } catch (error) {
      setErrorMsg('Failed to get location');
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.uri);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Location Tracking</Text>
      {hasPermission ? (
        <>
          <Button title="Get Current Location" onPress={getLocation} />
          {location && (
            <Text style={styles.info}>
              Latitude: {location.latitude} {'\n'}
              Longitude: {location.longitude}
            </Text>
          )}
          <Button title="Pick an Image" onPress={pickImage} />
          {image && <Image source={{ uri: image }} style={styles.image} />}
          {errorMsg && <Text style={styles.error}>{errorMsg}</Text>}
        </>
      ) : (
        <Text style={styles.error}>{errorMsg}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 20,
    marginBottom: 16,
  },
  info: {
    marginTop: 16,
    fontSize: 16,
  },
  image: {
    marginTop: 16,
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  error: {
    color: 'red',
    marginTop: 16,
  },
});

export default LocationTracking;

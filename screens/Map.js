import React, { useState, useEffect } from 'react'
import MapView, { Marker } from 'react-native-maps'
import { StyleSheet, Dimensions, View, Text, SafeAreaView, Image } from 'react-native'
import * as Location from 'expo-location';
import { icons, SIZES } from '../constants';

const height = Dimensions.get('window').height

const Map = () => {

  const markers = [
    {
      "title": "Car Wash",
      "description": "Nettoyage voitures",
      "pinColor": "#0c88fb",
      "coords": {
        "latitude": 35.6851357,
        "longitude": -5.4014976,
      },
    },
    {
      "title": "Carpet Wash",
      "description": "Nettoyage des tapis",
      "pinColor": "#0a6d13",
      "coords": {
        "latitude": 35.5851327,
        "longitude": -5.4014976,
      },
    },
    {
      "title": "House clean",
      "description": "Nettoyage des maisons",
      "pinColor": "#ba4c26",
      "coords": {
        "latitude": 35.8851397,
        "longitude": -5.4014976,
      },
    },
  ];

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [region, setRegion] = useState();

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  useEffect(() => {
    let text = 'Waiting..';

    if (errorMsg)
      text = errorMsg;

    else if (location) {
      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.03,
        longitudeDelta: 0.03,
      })
      console.log("location => " + location.coords.latitude)
    }
  }, [location])

  const [servicesColors, setServiceColors] = useState([
    {
      "service": "Car wash",
      "color": "#0c88fb"
    },
    {
      "service": "Carpet wash",
      "color": "#0a6d13"
    },
    {
      "service": "House clean",
      "color": "#ba4c26"
    },
    {
      "service": "Anti Bug",
      "color": "#763ce3"
    },
    {
      "service": "Garden clean",
      "color": "#9a1917"
    },
  ]);

  const renderMapKey = () => {
    return (
      <View
        style={{
          position: "absolute",
          justifyContent: "center",
          alignItems: "center",
          top: 10,
          left: 10,
          backgroundColor: "white",
          borderRadius: 10,
          padding: 7,
        }}
      >
        {servicesColors.map((serColor, index) => (
          <View
            key={index}
            style={{
              backgroundColor: serColor.color,
              width: 65,
              alignItems: "center",
              marginVertical: 3,
              paddingVertical: 2,
              borderRadius: 25,
              shadow: {
                shadowColor: "gray",
                shadowOffset: {
                  width: 0,
                  height: 12,
                },
                shadowOpacity: 0.5,
                shadowRadius: 3.5,
                elevation: 5,
              }
            }}
          >
            <Text
              style={{
                color: "white",
                fontSize: 10
              }}
            >
              {serColor.service}
            </Text>
          </View>
        ))}
      </View>
    )
  }

  return (
    <SafeAreaView>
      <MapView
        style={styles.map}
        loadingEnabled={true}
        region={region}
        showsUserLocation={true}
      >
        {markers.map((marker, index) => (
          <Marker
            key={index}
            coordinate={{ latitude: marker.coords.latitude, longitude: marker.coords.longitude }}
            title={marker.title}
            description={marker.description}
          >
            <View>
              <Image
                source={icons.position}
                resizeMode="cover"
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: SIZES.radius,
                  tintColor: marker.pinColor
                }}
              />
            </View>
          </Marker>
        ))}
      </MapView>
      {renderMapKey()}
    </SafeAreaView>

  )
}

const styles = StyleSheet.create({
  map: {
    height
  }
})

export default Map
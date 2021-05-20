import React, { useState, useEffect } from "react";
import axios from "axios";
import MapView from "react-native-maps";
import * as Location from "expo-location";

import { StyleSheet, View, ActivityIndicator } from "react-native";
import colors from "../assets/colors";
const { redBnb } = colors;

const AroundMeScreen = ({ navigation }) => {
  const [location, setLocation] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [authorize, setAuthorize] = useState(false);
  const [locationClose, setLocationClose] = useState([]);

  useEffect(() => {
    const getPermission = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();

        if (status === "granted") {
          const location = await Location.getCurrentPositionAsync();
          setLocation({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          });
          setAuthorize(true);
        } else {
          setLocation({
            latitude: 42,
            longitude: -1.6,
          });
        }
      } catch (error) {
        console.log(error);
      }
    };
    getPermission();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response;
        if (authorize) {
          response = await axios.get(
            `https://express-airbnb-api.herokuapp.com/rooms/around?latitude=${location.latitude}&longitude=${location.longitude}`
          );
        } else {
          response = await axios.get(
            `https://express-airbnb-api.herokuapp.com/rooms/around`
          );
        }
        const locations = response.data.map((elem) => elem);
        setLocationClose(locations);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [authorize, location]);

  const displayMarker = locationClose.map((elem, index) => {
    return (
      <MapView.Marker
        key={index}
        coordinate={{
          latitude: elem.location[1],
          longitude: elem.location[0],
        }}
        onPress={() => {
          console.log(navigation);
          navigation.navigate("Room", {
            roomId: elem._id,
          });
        }}
      />
    );
  });

  return isLoading ? (
    <ActivityIndicator size="large" color={redBnb} />
  ) : (
    <View>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
        showsUserLocation={true}
      >
        {displayMarker}
      </MapView>
    </View>
  );
};

export default AroundMeScreen;

const styles = StyleSheet.create({
  map: {
    height: "100%",
    width: "100%",
  },
});

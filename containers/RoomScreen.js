import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesome } from "@expo/vector-icons";
import MapView from "react-native-maps";

import {
  StyleSheet,
  ActivityIndicator,
  Text,
  View,
  Image,
  ImageBackground,
  ScrollView,
} from "react-native";

import colors from "../assets/colors";
const { redBnb } = colors;

export default function RoomScreen({ route }) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [displayAllText, setDisplayAllText] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const id = route.params.roomId;
      try {
        const response = await axios.get(
          `https://express-airbnb-api.herokuapp.com/rooms/${id}`
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const displayStars = (value) => {
    const tab = [];

    for (let i = 1; i <= 5; i++) {
      if (i <= value) {
        tab.push(
          <FontAwesome name="star" size={24} color="goldenrod" key={i} />
        );
      } else {
        tab.push(
          <FontAwesome name="star" size={24} color="lightgrey" key={i} />
        );
      }
    }

    return tab;
  };

  return isLoading ? (
    <ActivityIndicator size="large" color={redBnb} />
  ) : (
    <ScrollView style={styles.container}>
      <ImageBackground
        source={{ uri: data.photos[0].url }}
        style={styles.bgImg}
      >
        <View style={styles.price}>
          <Text style={styles.priceText}>{data.price} €</Text>
        </View>
      </ImageBackground>

      <View style={styles.flexRow}>
        <View style={styles.informations}>
          <Text numberOfLines={1} style={styles.infoTitle}>
            {data.title}
          </Text>

          <View style={styles.rating}>
            {displayStars(data.ratingValue)}
            <Text>{data.reviews} reviews</Text>
          </View>
        </View>
        <Image
          source={{ uri: data.user.account.photo.url }}
          style={styles.profileImg}
        />
      </View>
      <Text
        style={styles.description}
        numberOfLines={!displayAllText ? 3 : null}
        onPress={() => {
          setDisplayAllText(!displayAllText);
        }}
      >
        {data.description}
      </Text>

      {/* Map */}
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: data.location[1],
          longitude: data.location[0],
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
      >
        <MapView.Marker
          coordinate={{
            latitude: data.location[1],
            longitude: data.location[0],
          }}
        />
      </MapView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },

  bgImg: {
    width: "100%",
    height: 300,
    justifyContent: "flex-end",
    alignItems: "flex-start",
  },
  price: {
    backgroundColor: "black",
    alignItems: "center",
    marginBottom: 20,
    padding: 10,
    minWidth: 100,
  },
  priceText: {
    color: "white",
    fontSize: 22,
  },
  flexRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 5,
    paddingHorizontal: 20,
  },
  informations: {
    width: "70%",
    justifyContent: "space-evenly",
  },
  infoTitle: {
    fontSize: 20,
  },
  rating: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileImg: {
    height: 70,
    width: 70,
    borderRadius: 35,
  },
  description: {
    marginTop: 10,
    paddingHorizontal: 20,
  },
  map: {
    height: 300,
    width: "100%",
    marginTop: 50,
  },
});

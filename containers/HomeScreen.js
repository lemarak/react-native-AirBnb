import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  Image,
  ImageBackground,
  Text,
  View,
} from "react-native";

import axios from "axios";
import { FontAwesome } from "@expo/vector-icons";

import colors from "../assets/colors";
const { redBnb } = colors;

export default function HomeScreen({ navigation }) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "https://express-airbnb-api.herokuapp.com/rooms"
      );
      setData(response.data);
      setIsLoading(false);
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
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => {
        return (
          <TouchableOpacity
            style={styles.container}
            onPress={() => {
              navigation.navigate("Room", {
                roomId: item._id,
              });
            }}
          >
            <ImageBackground
              source={{ uri: item.photos[0].url }}
              style={styles.bgImg}
            >
              <View style={styles.price}>
                <Text style={styles.priceText}>{item.price} €</Text>
              </View>
            </ImageBackground>

            <View style={styles.flexRow}>
              <View style={styles.informations}>
                <Text numberOfLines={1} style={styles.infoTitle}>
                  {item.title}
                </Text>

                <View style={styles.rating}>
                  {displayStars(item.ratingValue)}
                  <Text>{item.reviews} reviews</Text>
                </View>
              </View>
              <Image
                source={{ uri: item.user.account.photo.url }}
                style={styles.profileImg}
              />
            </View>
          </TouchableOpacity>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderBottomColor: redBnb,
    marginBottom: 30,
    padding: 20,
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
});

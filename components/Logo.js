import React, { useState, useEffect } from "react";
import { Image, StyleSheet } from "react-native";

const Logo = ({ size }) => {
  return (
    <Image
      style={size === "small" ? styles.headerImgSmall : styles.headerImg}
      source={require("../assets/logo.png")}
      resizeMode="contain"
    />
  );
};

export default Logo;

const styles = StyleSheet.create({
  headerImg: {
    height: 100,
    width: 100,
  },
  headerImgSmall: {
    height: 35,
    width: 35,
  },
});

import React from "react";
import { useNavigation } from "@react-navigation/core";
import {
  StyleSheet,
  Image,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";

import colors from "../assets/colors";
const { redBnb } = colors;

export default function SignInScreen({ setToken }) {
  const navigation = useNavigation();
  return (
    <View>
      {/* Header */}
      <View style={styles.header}>
        <Image
          style={styles.headerImg}
          source={require("../assets/logo.png")}
          resizeMode="contain"
        />
        <Text style={styles.headerText}>Sign In</Text>
      </View>

      {/* Form */}
      <View style={styles.form}>
        <View style={styles.formInputs}>
          <TextInput style={styles.formInput} placeholder="email" />

          <TextInput
            style={styles.formInput}
            placeholder="password"
            secureTextEntry={true}
          />
        </View>
        <View style={styles.formInputs}>
          <TouchableOpacity
            style={styles.formBtnValidate}
            onPress={async () => {
              const userToken = "secret-token";
              setToken(userToken);
            }}
          >
            <Text style={styles.formTextValidate}>Sign in</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("SignUp");
            }}
          >
            <Text>Create an account</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    justifyContent: "center",
    alignItems: "center",
    height: "30%",
  },
  headerImg: {
    height: 130,
    width: 100,
  },
  headerText: {
    fontSize: 24,
    color: "#333",
  },
  form: {
    height: "70%",
    justifyContent: "space-around",
    paddingHorizontal: 30,
    paddingTop: 20,
    paddingBottom: 80,
  },
  formInputs: {
    alignItems: "center",
  },
  formInput: {
    width: "100%",
    height: 30,
    fontSize: 18,
    borderBottomColor: redBnb,
    borderBottomWidth: 1,
    marginBottom: 30,
  },
  formBtnValidate: {
    height: 50,
    width: 180,
    alignItems: "center",
    justifyContent: "center",
    borderColor: redBnb,
    borderWidth: 2,
    borderRadius: 36,
    marginBottom: 20,
  },
  formTextValidate: {
    fontSize: 18,
  },
});

import React from "react";
import { useNavigation } from "@react-navigation/core";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
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

export default function SignUpScreen({ setToken }) {
  const navigation = useNavigation();
  return (
    <KeyboardAwareScrollView>
      {/* Header */}
      <View style={styles.header}>
        <Image
          style={styles.headerImg}
          source={require("../assets/logo.png")}
          resizeMode="contain"
        />
        <Text style={styles.headerText}>Sign Up</Text>
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
          <TextInput
            style={[styles.formInput, styles.formInputArea]}
            multiline={true}
            numberOfLines={4}
            textAlignVertical="top"
            placeholder="Describe yourself in few words..."
          />
          <TextInput style={styles.formInput} placeholder="password" />
          <TextInput style={styles.formInput} placeholder="confirm password" />
        </View>
        <View style={styles.formInputs}>
          <TouchableOpacity
            style={styles.formBtnValidate}
            onPress={async () => {
              const userToken = "secret-token";
              setToken(userToken);
            }}
          >
            <Text style={styles.formTextValidate}>Sign up</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("SignIn");
            }}
          >
            <Text>Already have an account? Sign in</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    marginTop: "20%",
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
    flex: 1,
    marginTop: "20%",
    justifyContent: "space-around",
    paddingHorizontal: 30,
    paddingTop: 10,
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
    marginBottom: 26,
  },
  formInputArea: {
    borderColor: redBnb,
    borderWidth: 1,
    height: 100,
    paddingHorizontal: 10,
    justifyContent: "flex-start",
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

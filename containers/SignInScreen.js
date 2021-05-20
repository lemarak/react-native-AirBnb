import React, { useState } from "react";
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

const axios = require("axios");

import Logo from "../components/Logo.js";
import colors from "../assets/colors";
const { redBnb } = colors;

export default function SignInScreen({ setToken }) {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // error
  // 1: email non saisi
  // 2: password non saisi
  // 3: bad authentification
  // 4: unknow error
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    if (email && password) {
      const data = { email, password };
      try {
        const response = await axios.post(
          "https://express-airbnb-api.herokuapp.com/user/log_in",
          data
        );
        console.log(response.data);
        const token = response.data.token;
        if (token) {
          setToken(token);
          setError(0);
          alert("C'est good !");
        }
      } catch (error) {
        console.log(error.response.status);
        if (error.response.status === 401) {
          setError(3);
        } else {
          setError(4);
        }
      }
    } else {
      if (!email) {
        setError(1);
      } else {
        setError(2);
      }
    }
  };

  return (
    <KeyboardAwareScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Logo />
        <Text style={styles.headerText}>Sign In</Text>
      </View>

      {/* Form */}
      <View style={styles.form}>
        <View style={styles.formInputs}>
          <TextInput
            style={styles.formInput}
            placeholder="email"
            onChangeText={(text) => {
              setEmail(text);
            }}
            autoCapitalize="none"
          />
          {error === 1 && (
            <Text style={styles.textError}>*email obligatoire</Text>
          )}

          <TextInput
            style={styles.formInput}
            placeholder="password"
            secureTextEntry={true}
            autoCapitalize="none"
            onChangeText={(text) => {
              setPassword(text);
            }}
          />
          {error === 2 && (
            <Text style={styles.textError}>*mot de passe obligatoire</Text>
          )}
          {error === 3 && (
            <Text style={styles.textError}>
              *les identifiants ne sont pas corrects
            </Text>
          )}
        </View>
        <View style={styles.formInputs}>
          <TouchableOpacity
            style={styles.formBtnValidate}
            onPress={async () => {
              handleSubmit();
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
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
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
    // height: "100%",
    flex: 1,
    marginTop: "20%",
    justifyContent: "space-around",
    paddingHorizontal: 30,
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
    marginTop: 30,
    marginBottom: 3,
  },
  formBtnValidate: {
    height: 50,
    width: 180,
    alignItems: "center",
    justifyContent: "center",
    borderColor: redBnb,
    borderWidth: 2,
    borderRadius: 36,
    marginTop: 30,
    marginBottom: 10,
  },
  formTextValidate: {
    fontSize: 18,
  },
  textError: {
    color: redBnb,
  },
});

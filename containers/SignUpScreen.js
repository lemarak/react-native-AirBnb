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

export default function SignUpScreen({ setToken }) {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // error
  // 1: email non saisi
  // 2: username non saisi
  // 3: description non saisie
  // 4: password non saisi
  // 5: confirm password non saisi
  // 6: passwords differents
  // 7: bad authentification
  // 8: unknow error
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    if (email && username && description && password && confirmPassword) {
      if (password !== confirmPassword) {
        setError(6);
      } else {
        const data = { email, password, username, description };
        console.log(data);
        try {
          const response = await axios.post(
            "https://express-airbnb-api.herokuapp.com/user/sign_up",
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
      }
    } else {
      if (!email) {
        setError(1);
      } else if (!username) {
        setError(2);
      } else if (!description) {
        setError(3);
      } else if (!password) {
        setError(4);
      } else if (!confirmPassword) {
        setError(5);
      }
    }
  };

  return (
    <KeyboardAwareScrollView>
      {/* Header */}
      <View style={styles.header}>
        <Logo />
        <Text style={styles.headerText}>Sign Up</Text>
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
          />
          {error === 1 && (
            <Text style={styles.textError}>*email obligatoire</Text>
          )}

          <TextInput
            style={styles.formInput}
            placeholder="username"
            onChangeText={(text) => {
              setUsername(text);
            }}
          />
          {error === 2 && (
            <Text style={styles.textError}>*username obligatoire</Text>
          )}
          <TextInput
            style={[styles.formInput, styles.formInputArea]}
            multiline={true}
            numberOfLines={4}
            textAlignVertical="top"
            placeholder="Describe yourself in few words..."
            onChangeText={(text) => {
              setDescription(text);
            }}
          />
          {error === 3 && (
            <Text style={styles.textError}>*description obligatoire</Text>
          )}
          <TextInput
            style={styles.formInput}
            placeholder="password"
            secureTextEntry={true}
            onChangeText={(text) => {
              setPassword(text);
            }}
          />
          {error === 4 && (
            <Text style={styles.textError}>*mot de passe obligatoire</Text>
          )}
          <TextInput
            style={styles.formInput}
            placeholder="confirm password"
            secureTextEntry={true}
            onChangeText={(text) => {
              setConfirmPassword(text);
            }}
          />
          {error === 5 && (
            <Text style={styles.textError}>*confirmation obligatoire</Text>
          )}
          {error === 6 && (
            <Text style={styles.textError}>*mots de passe différents</Text>
          )}
        </View>
        <View style={styles.formInputs}>
          <TouchableOpacity
            style={styles.formBtnValidate}
            onPress={async () => {
              handleSubmit();
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
    marginTop: 22,
    marginBottom: 4,
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
    marginTop: 20,
    marginBottom: 10,
  },
  formTextValidate: {
    fontSize: 18,
  },
  textError: {
    color: redBnb,
  },
});

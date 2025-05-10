import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";

import { StyleSheet, Text, View, Pressable, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  makeRedirectUri,
  useAuthRequest,
  ResponseType,
} from "expo-auth-session";

import { useNavigation } from "@react-navigation/native";
import { authConfig } from "../config";

import { useTranslation } from "react-i18next";

import {
  Entypo,
  MaterialCommunityIcons,
  MaterialIcons,
  AntDesign,
  Ionicons,
} from "@expo/vector-icons";

const LoginScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const [request, response, promptAsync] = useAuthRequest(
    {
      ...authConfig.config,
    },
    {
      ...authConfig.discovery,
    }
  );

  console.log("Redirect URI:", authConfig.config.redirectUri);

  const handleLogin = async () => {
    if (!request || isAuthenticating) return;
    try {
      setIsAuthenticating(true);
      await promptAsync();
      setIsAuthenticating(false);
    } catch (err) {
      console.log("Prompt async error:", err);
      Alert.alert("Error", err.message);
    }
  };

  useEffect(() => {
    const checkTokenValidity = async () => {
      console.log("Checking token validity...");

      const accessToken = await AsyncStorage.getItem("token");
      const expirationDate = await AsyncStorage.getItem("expirationDate");

      if (accessToken && expirationDate) {
        const currentTime = Date.now();
        if (currentTime < parseInt(expirationDate)) {
          console.log("Token is still valid, navigating to Main...");
          navigation.replace("Main");
        } else {
          console.log("Token expired, clearing storage...");
          await AsyncStorage.removeItem("token");
          await AsyncStorage.removeItem("expirationDate");
        }
      }
    };

    checkTokenValidity();
  }, []);

  useEffect(() => {
    const saveToken = async () => {
      if (response?.type === "success") {
        console.log("Auth Response:", response);

        const { access_token, expires_in } = response.params;
        if (access_token) {
          const expirationDate = Date.now() + expires_in * 1000;
          await AsyncStorage.setItem("token", access_token);
          await AsyncStorage.setItem(
            "expirationDate",
            expirationDate.toString()
          );

          console.log("Token and expiration date saved!");
          navigation.navigate("Main");
        }
      } else if (response?.type === "error") {
        console.error("Auth Error:", response.error);
        Alert.alert("Error", response.error);
      }
    };

    saveToken();
  }, [response]);

  return (
    <LinearGradient colors={["#040306", "#131624"]} style={{ flex: 1 }}>
      <SafeAreaView
        style={{
          width: "90%",
          alignSelf: "center",
        }}
      >
        <View style={{ height: 80 }} />
        <Entypo
          style={{ textAlign: "center" }}
          name="spotify"
          size={80}
          color="white"
        />
        <Text
          style={{
            color: "white",
            fontSize: 32,
            fontWeight: "bold",
            textAlign: "center",
            marginTop: 30,
          }}
        >
          {t("Millions of Songs Free on spotify!")}
        </Text>

        <View style={{ height: 80 }} />

        {/* Sign In with email */}
        <Pressable
          disabled={!request || isAuthenticating}
          onPress={handleLogin}
          style={{
            backgroundColor: "#1DB954",
            padding: 10,
            marginLeft: "auto",
            marginRight: "auto",
            width: 300,
            borderRadius: 25,
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
            alignItems: "center",
            marginVertical: 10,
          }}
        >
          <MaterialCommunityIcons
            name="email-outline"
            size={24}
            color="black"
          />
          <Text
            style={{
              fontWeight: "bold",
              textAlign: "center",
              flex: 1,
            }}
          >
            {t("Continue with email")}
          </Text>
        </Pressable>

        {/* Sign In with Phone number */}
        <Pressable
          style={{
            backgroundColor: "#131624",
            padding: 10,
            marginLeft: "auto",
            marginRight: "auto",
            width: 300,
            borderRadius: 25,
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
            alignItems: "center",
            marginVertical: 10,
            borderColor: "#C0C0C0",
            borderWidth: 0.8,
          }}
        >
          <MaterialIcons name="phone-android" size={24} color="white" />
          <Text
            style={{
              fontWeight: "500",
              color: "white",
              textAlign: "center",
              flex: 1,
            }}
          >
            {t("Continue with phone number")}
          </Text>
        </Pressable>

        {/* Sign In with Google */}
        <Pressable
          style={{
            backgroundColor: "#131624",
            padding: 10,
            marginLeft: "auto",
            marginRight: "auto",
            width: 300,
            borderRadius: 25,
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
            alignItems: "center",
            marginVertical: 10,
            borderColor: "#C0C0C0",
            borderWidth: 0.8,
          }}
        >
          <AntDesign name="google" size={24} color="red" />
          <Text
            style={{
              fontWeight: "500",
              color: "white",
              textAlign: "center",
              flex: 1,
            }}
          >
            {t("Continue with Google")}
          </Text>
        </Pressable>

        {/* Sign In with facebook */}
        <Pressable
          style={{
            backgroundColor: "#131624",
            padding: 10,
            marginLeft: "auto",
            marginRight: "auto",
            width: 300,
            borderRadius: 25,
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
            alignItems: "center",
            marginVertical: 10,
            borderColor: "#C0C0C0",
            borderWidth: 0.8,
          }}
        >
          <Ionicons name="logo-facebook" size={24} color="blue" />
          <Text
            style={{
              fontWeight: "500",
              color: "white",
              textAlign: "center",
              flex: 1,
            }}
          >
            {t("Continue with facebook")}
          </Text>
        </Pressable>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});

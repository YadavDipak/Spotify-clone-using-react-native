import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native";
import React, { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Entypo } from "@expo/vector-icons";

import { useNavigation } from "@react-navigation/native";
import { getCurrentUser } from "../services/user";

import { useTranslation } from "react-i18next";

const ProfileScreen = () => {
  const { t } = useTranslation();

  const [userProfile, setUserProfile] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const result = await getCurrentUser();

        if (result) {
          setUserProfile(result);
        }
      } catch (err) {
        Alert.alert("Error", err.message);
      }
    };
    fetchCurrentUser();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <LinearGradient
          style={{ height: 280, padding: 12, gap: 20, paddingTop: 40 }}
          colors={["#4d94ff", "#1a75ff", "#003380", "#001f4d", "#001433"]}
        >
          <View>
            <Ionicons
              style={{ marginBottom: 10 }}
              name="arrow-back-outline"
              size={24}
              color="white"
              onPress={() => navigation.goBack()}
            />
            <View
              style={{ flexDirection: "row", gap: 20, alignItems: "center" }}
            >
              <Image
                style={{
                  width: 140,
                  height: 140,
                  borderRadius: 100,
                  resizeMode: "cover",
                }}
                source={{
                  uri:
                    userProfile?.images.length > 0
                      ? userProfile?.images[0].url
                      : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQABqQIdskCD9BK0I81EbVfV9tTz320XvJ35A&s",
                }}
              />
              <View style={{ gap: 8 }}>
                <Text
                  style={{ color: "white", fontWeight: "bold", fontSize: 24 }}
                >
                  {userProfile?.display_name}
                </Text>
                <Text
                  style={{ color: "white", fontWeight: "bold", fontSize: 12 }}
                >
                  {userProfile?.followers.total}
                  <Text style={{ color: "#B0B0B0", fontWeight: "600" }}>
                    {" "}
                    {t("followers")}
                  </Text>
                  <Text style={{ color: "white" }}> • </Text>5
                  <Text style={{ color: "#B0B0B0", fontWeight: "600" }}>
                    {" "}
                    {t("following")}
                  </Text>
                </Text>
              </View>
            </View>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 20 }}>
            <TouchableOpacity
              style={{
                borderWidth: 1,
                borderColor: "white",
                paddingVertical: 8,
                paddingHorizontal: 16,
                borderRadius: 50,
              }}
            >
              <Text style={{ color: "white", textAlign: "center" }}>
                {t("Edit")}
              </Text>
            </TouchableOpacity>
            <Entypo name="dots-three-vertical" size={22} color="white" />
          </View>
        </LinearGradient>

        {/* Second LinearGradient */}
        <LinearGradient
          colors={["#001433", "#000a1a", "#000000"]}
          style={{ height: "100%" }}
        >
          <Text
            style={{
              color: "white",
              textAlign: "center",
              fontSize: 24,
              marginTop: 20,
              fontWeight: "600",
            }}
          >
            {t("No Recent Activity")}
          </Text>
        </LinearGradient>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});

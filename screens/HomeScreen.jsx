import React, { useState, useEffect, useCallback } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Alert,
  RefreshControl,
  ActivityIndicator,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { getCurrentUser } from "../services/user";
import TopArtists from "../components/artist/TopArtists";
import RecentlyPlayedSongs from "../components/RecentlyPlayedSongs";
import NewReleases from "../components/album/NewReleases";

import { useTranslation } from "react-i18next";

const HomeScreen = () => {
  const [userProfile, setUserProfile] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selected, setSelected] = useState("All");
  const navigation = useNavigation();

  const { t, i18n } = useTranslation();

  const changeLanguage = () => {
    if (i18n.language === "en") {
      i18n.changeLanguage("gr");
    } else {
      i18n.changeLanguage("en");
    }
  };

  const fetchCurrentUser = async () => {
    try {
      const result = await getCurrentUser();
      if (result) {
        setUserProfile(result);
      }
    } catch (err) {
      Alert.alert("Error", err.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchCurrentUser();
  }, []);

  return (
    <LinearGradient
      colors={["#040306", "#131624"]}
      style={{ flex: 1, padding: 10 }}
    >
      {loading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" color="#FFFFFF" />
        </View>
      ) : (
        <ScrollView
          style={{ marginTop: 10 }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <SafeAreaView>
            {/* Home page header */}
            <View
              style={{
                padding: 10,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                {/* User Profile Image */}
                <Pressable onPress={() => navigation.navigate("Profile")}>
                  {userProfile?.images?.length > 0 && (
                    <Image
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        resizeMode: "cover",
                      }}
                      source={{ uri: userProfile?.images[0]?.url }}
                    />
                  )}
                </Pressable>

                {/* Filter Buttons in a Row */}
                <View
                  style={{
                    marginLeft: 20,
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  {/* <View> */}
                  {["All", "Music"].map((category) => (
                    <Pressable
                      key={category}
                      onPress={() => setSelected(category)}
                      style={{
                        backgroundColor:
                          selected === category ? "gray" : "#282828",
                        padding: 10,
                        borderRadius: 30,
                      }}
                    >
                      <Text style={{ fontSize: 15, color: "white" }}>
                        {t(category)}
                      </Text>
                    </Pressable>
                  ))}
                  {/* </View> */}
                </View>
              </View>
              <Pressable
                onPress={changeLanguage}
                style={{
                  backgroundColor: selected === "Language" ? "gray" : "#282828",
                  padding: 10,
                  borderRadius: 30,
                }}
              >
                <Text style={{ fontSize: 12, color: "white" }}>
                  {t("Change Language")}
                </Text>
              </Pressable>
            </View>

            {/* Home page liked songs */}

            <View style={{ height: 10 }} />

            {/* Render only if "All" is selected */}
            {selected === "All" && (
              <View>
                {/* Liked Songs and Random Artist */}
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Pressable
                    onPress={() => navigation.navigate("Liked")}
                    style={{
                      marginBottom: 10,
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 10,
                      flex: 1,
                      marginHorizontal: 10,
                      marginVertical: 8,
                      backgroundColor: "#202020",
                      borderRadius: 4,
                    }}
                  >
                    <LinearGradient colors={["#33006F", "#FFFFFF"]}>
                      <Pressable
                        style={{
                          width: 55,
                          height: 55,
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <AntDesign name="heart" size={24} color="white" />
                      </Pressable>
                    </LinearGradient>
                    <Text
                      numberOfLines={1}
                      style={{
                        color: "white",
                        fontSize: 13,
                        fontWeight: "bold",
                        width: 85,
                      }}
                    >
                      {t("Liked Songs")}
                    </Text>
                  </Pressable>

                  {/* Random Artist */}
                  <View
                    style={{
                      marginBottom: 10,
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 10,
                      flex: 1,
                      marginHorizontal: 10,
                      marginVertical: 8,
                      backgroundColor: "#202020",
                      borderRadius: 4,
                    }}
                  >
                    <Image
                      style={{ width: 55, height: 55 }}
                      source={{ uri: "https://i.pravatar.cc/100" }}
                    />
                    <View>
                      <Text
                        style={{
                          color: "white",
                          fontSize: 13,
                          fontWeight: "bold",
                        }}
                      >
                        Tamhiza
                      </Text>
                    </View>
                  </View>
                </View>

                {/* Users' top artists */}
                <TopArtists t={t} />
              </View>
            )}

            {/* Always visible when "Music" is selected */}
            <RecentlyPlayedSongs t={t} />
            <NewReleases t={t} />
          </SafeAreaView>
        </ScrollView>
      )}
    </LinearGradient>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});

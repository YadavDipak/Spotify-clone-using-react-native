import React, { useState, useEffect } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Alert,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";

import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import { getCurrentUser } from "../services/user";
import TopArtists from "../components/artist/TopArtists";
import RecentlyPlayedSongs from "../components/RecentlyPlayedSongs";
import NewReleases from "../components/album/NewReleases";

const HomeScreen = () => {
  const [userProfile, setUserProfile] = useState([]);
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
    <LinearGradient
      colors={["#040306", "#131624"]}
      style={{ flex: 1, padding: 10 }}
    >
      <ScrollView style={{ marginTop: 10 }}>
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
              {userProfile?.images?.length > 0 && (
                <Image
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    resizeMode: "cover",
                  }}
                  source={{ uri: userProfile?.images[0].url }}
                />
              )}

              {/* Filter Buttons in a Row */}
              <View
                style={{
                  marginLeft: 20,
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <Pressable
                  style={{
                    backgroundColor: "#282828",
                    padding: 10,
                    borderRadius: 30,
                  }}
                >
                  <Text style={{ fontSize: 15, color: "white" }}>All</Text>
                </Pressable>

                <Pressable
                  style={{
                    backgroundColor: "#282828",
                    padding: 10,
                    borderRadius: 30,
                  }}
                >
                  <Text style={{ fontSize: 15, color: "white" }}>Music</Text>
                </Pressable>
              </View>
            </View>
          </View>

          {/* Home page liked songs */}

          <View style={{ height: 10 }} />

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
                elevation: 3,
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
                style={{ color: "white", fontSize: 13, fontWeight: "bold" }}
              >
                Liked Songs
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
                elevation: 3,
              }}
            >
              <Image
                style={{ width: 55, height: 55 }}
                source={{ uri: "https://i.pravatar.cc/100" }}
              />
              <View style={styles.randomArtist}>
                <Text
                  style={{ color: "white", fontSize: 13, fontWeight: "bold" }}
                >
                  Tamhiza
                </Text>
              </View>
            </View>
          </View>

          {/* users's top artists */}
          <TopArtists />

          {/* user's recently played songs */}
          <RecentlyPlayedSongs />

          {/* New release songs */}
          <NewReleases />
        </SafeAreaView>
      </ScrollView>
    </LinearGradient>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});

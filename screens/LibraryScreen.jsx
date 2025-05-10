import { View, Text, Pressable, Image, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  getCurrentUser,
  getFollowedArtists,
  getUsersPlaylist,
} from "../services/user";

import CustomButton from "../components/CustomButton";

import { useNavigation } from "@react-navigation/native";
import ArtistPlaylist from "../components/ArtistPlaylist";

import { useTranslation } from "react-i18next";

const LibraryScreen = () => {
  const { t } = useTranslation();

  const navigation = useNavigation();
  const [userProfile, setUserProfile] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [artists, setArtists] = useState([]);
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch current user
        const userResult = await getCurrentUser();
        if (userResult) {
          setUserProfile(userResult);
        }

        // Fetch artists and playlists concurrently
        const [artistsResult, playlistsResult] = await Promise.allSettled([
          getFollowedArtists(),
          getUsersPlaylist(),
        ]);

        // Handle user artists
        if (artistsResult.status === "fulfilled") {
          setArtists(artistsResult.value?.artists.items || []);
        } else {
          Alert.alert("Error", "Failed to fetch user followed artists");
        }

        // Handle user playlists
        if (playlistsResult.status === "fulfilled") {
          setPlaylists(playlistsResult.value || []);
        } else {
          Alert.alert("Error", "Failed to fetch user playlists");
        }
      } catch (err) {
        Alert.alert("Error", err.message);
      }
    };

    fetchData();
  }, []);

  return (
    <LinearGradient colors={["#040306", "#131624"]} style={{ flex: 1 }}>
      <SafeAreaView>
        <View
          style={{
            paddingHorizontal: 16,
            flexDirection: "column",
            gap: 10,
            marginBottom: 48,
          }}
        >
          <View
            style={{
              width: "100%",
              marginTop: 40,
              flexDirection: "row",
              alignItems: "center",
              gap: 20,
            }}
          >
            <Pressable
              onPress={() => {
                navigation.navigate("Profile");
              }}
            >
              <Image
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  resizeMode: "cover",
                }}
                source={{
                  uri:
                    userProfile?.images.length > 0
                      ? userProfile?.images[0].url
                      : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQABqQIdskCD9BK0I81EbVfV9tTz320XvJ35A&s",
                }}
              />
            </Pressable>
            <Text style={{ color: "white", fontSize: 24, fontWeight: "bold" }}>
              {t("Your Library")}
            </Text>
          </View>

          <View style={{ flexDirection: "row", gap: 10, marginTop: 10 }}>
            {["All", "Artists", "Playlists"].map((categoryKey) => (
              <CustomButton
                key={categoryKey}
                isActive={activeCategory === categoryKey}
                handlePress={(key) => setActiveCategory(key)}
                categoryKey={categoryKey}
                categoryLabel={t(categoryKey)}
              />
            ))}
          </View>

          <View>
            <ArtistPlaylist
              artists={artists}
              playlists={playlists}
              activeCategory={activeCategory}
            />
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default LibraryScreen;

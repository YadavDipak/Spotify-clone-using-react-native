import { Alert, FlatList, Image, Pressable, Text, View } from "react-native";
import React, { useEffect, useState, useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import {
  getPlaylistSongs,
  followPlaylist,
  unfollowPlaylist,
} from "../services/playlist";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Entypo } from "@expo/vector-icons";
import { reduceUniqueSongs } from "../utils/getUniqueSongs";
import Ionicons from "@expo/vector-icons/Ionicons";

import { FollowedPlaylistContext } from "../context/FollowedPlaylistContext";

const PlaylistScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { item } = route.params;
  const [playlistTracks, setPlayListsTracks] = useState([]);

  console.log("item ---------------------------------------", item);

  const { followedPlaylists, setFollowedPlaylists } = useContext(
    FollowedPlaylistContext
  );

  const [isFollowed, setIsFollowed] = useState(
    followedPlaylists.map((item) => item.id)
  );

  // function to follow a playlist
  async function handleFollowAPlaylist() {
    try {
      if (!isFollowed.includes(item.id)) {
        const result = await followPlaylist(item.id);
        if (result) {
          setFollowedPlaylists((prev) => [item, ...prev]);
          setIsFollowed((prev) => [item.id, ...prev]);
        }
      } else {
        const result = await unfollowPlaylist(item.id);
        if (result) {
          setFollowedPlaylists((prev) =>
            prev.filter((it) => it.id !== item.id)
          );
          setIsFollowed((prev) => prev.filter((it) => it !== item.id));
        }
      }
    } catch (err) {
      Alert.alert("Error", err.message);
    }
  }

  useEffect(() => {
    const fetchPlaylistTracks = async () => {
      try {
        const result = await getPlaylistSongs(item.id, item.tracks.total);
        if (result) {
          setPlayListsTracks(reduceUniqueSongs(result.items));
        }
      } catch (err) {
        Alert.alert("Error", err.message);
      }
    };

    fetchPlaylistTracks();
  }, []);

  return (
    <LinearGradient colors={["#040306", "#131624"]} style={{ height: "100%" }}>
      <SafeAreaView>
        <View style={{ position: "absolute", top: 40, left: 20, zIndex: 100 }}>
          <Ionicons
            name="arrow-back-outline"
            size={24}
            color="white"
            onPress={() => navigation.goBack()}
          />
        </View>
        <LinearGradient
          colors={["rgb(48, 25, 52)", "rgb(52, 52, 52)", "rgb(27, 18, 18)"]}
          style={{
            padding: 40,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            style={{ width: 200, height: 200 }}
            source={{ uri: item?.images[0]?.url }}
          />
        </LinearGradient>

        <View style={{ padding: 16, gap: 8 }}>
          <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>
            {item?.name}
          </Text>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={{ color: "white", fontSize: 16, fontWeight: "600" }}>
              {item.tracks.total} Songs
            </Text>
            {/* <MaterialIcons name="playlist-add-check" size={24} color="green" /> */}
            <MaterialIcons
              onPress={() => {
                handleFollowAPlaylist();
              }}
              name={
                isFollowed.includes(item.id)
                  ? "playlist-add-check"
                  : "playlist-add"
              }
              size={24}
              color={isFollowed.includes(item.id) ? "green" : "white"}
            />
          </View>
        </View>

        <View style={{ paddingHorizontal: 16 }}>
          <FlatList
            style={{ marginTop: 20 }}
            data={playlistTracks}
            keyExtractor={(item) => item?.track?.id}
            renderItem={({ item, index }) => (
              <Pressable
                onPress={() =>
                  navigation.navigate("SongInfo", { item: item.track })
                }
                style={{
                  marginBottom: 8,
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 5,
                  borderRadius: 8,
                  padding: 8,
                  backgroundColor: "#202020",
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontSize: 16,
                    fontWeight: "bold",
                    marginRight: 5,
                  }}
                >
                  {index + 1}
                </Text>
                <Image
                  style={{ width: 55, height: 55, borderRadius: 8 }}
                  source={{
                    uri: item?.track?.album?.images[0]?.url
                      ? item?.track?.album?.images[0]?.url
                      : "https://static.vecteezy.com/system/resources/previews/002/249/673/non_2x/music-note-icon-song-melody-tune-flat-symbol-free-vector.jpg",
                  }}
                />
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flex: 1,
                    marginLeft: 5,
                  }}
                >
                  <View style={{ flex: 1 }}>
                    <Text
                      numberOfLines={1}
                      style={{
                        color: "white",
                        fontSize: 16,
                        fontWeight: "bold",
                        width: 200,
                      }}
                    >
                      {item?.track.name || "Unknown Melody"}
                    </Text>
                    <Text
                      style={{ color: "gray", fontSize: 12 }}
                      numberOfLines={1}
                    >
                      {item.track.artists
                        .map((artist) => artist.name)
                        .join(", ") || "Unknown Artist"}
                    </Text>
                  </View>
                  <Entypo name="dots-three-vertical" size={22} color="white" />
                </View>
              </Pressable>
            )}
            contentContainerStyle={{ paddingBottom: 950 }}
            ListEmptyComponent={
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                  height: 160,
                }}
              >
                <Text
                  style={{ color: "white", fontSize: 18, fontWeight: "600" }}
                >
                  No Tracks Found
                </Text>
              </View>
            }
          />
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default PlaylistScreen;

import React, { useEffect, useState } from "react";
import { Alert, FlatList, Image, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useNavigation, useRoute } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Entypo } from "@expo/vector-icons";

import { useDispatch, useSelector } from "react-redux";
import {
  followPlaylist,
  unfollowPlaylist,
} from "../src/redux/slices/followedPlaylistSlice";
import {
  getPlaylistSongs,
  followPlaylist as followPlaylistAPI,
  unfollowPlaylist as unfollowPlaylistAPI,
} from "../services/playlist";
import { reduceUniqueSongs } from "../utils/getUniqueSongs";
import { useTranslation } from "react-i18next";

const PlaylistScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const route = useRoute();
  const { item } = route.params;
  const dispatch = useDispatch();

  const [playlistTracks, setPlayListsTracks] = useState([]);

  // Get followed playlists from Redux store
  const followedPlaylists = useSelector(
    (state) => state.followedPlaylists?.followedPlaylists || []
  );
  const isFollowed = followedPlaylists.some(
    (playlist) => playlist.id === item.id
  );

  // Function to follow/unfollow playlist
  async function handleFollowAPlaylist() {
    try {
      if (!isFollowed) {
        const result = await followPlaylistAPI(item.id);
        if (result) {
          dispatch(followPlaylist(item));
        }
      } else {
        const result = await unfollowPlaylistAPI(item.id);
        if (result) {
          dispatch(unfollowPlaylist(item.id));
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
              {item.tracks.total} {t("Songs")}
            </Text>
            <MaterialIcons
              onPress={handleFollowAPlaylist}
              name={isFollowed ? "playlist-add-check" : "playlist-add"}
              size={24}
              color={isFollowed ? "green" : "white"}
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
                    uri:
                      item?.track?.album?.images[0]?.url ||
                      "https://static.vecteezy.com/system/resources/previews/002/249/673/non_2x/music-note-icon-song-melody-tune-flat-symbol-free-vector.jpg",
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

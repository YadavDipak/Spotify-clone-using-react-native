import React from "react";
import { View, Text, FlatList, Image, Pressable, Alert } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

import {
  followPlaylist as followPlaylistAPI,
  unfollowPlaylist as unfollowPlaylistAPI,
} from "../../services/playlist"; // API Calls
import {
  followPlaylist, // Redux Action
  unfollowPlaylist, // Redux Action
} from "../../src/redux/slices/followedPlaylistSlice"; // ✅ Correct Import

const Playlists = ({ playlists }) => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  // Get followed playlists from Redux store
  const followedPlaylists = useSelector(
    (state) => state.followedPlaylists?.followedPlaylists || []
  );

  // Convert followedPlaylists to an array of IDs
  const followedPlaylistIds = followedPlaylists.map((item) => item.id);

  async function handleFollowAPlaylist(item) {
    try {
      if (!followedPlaylistIds.includes(item.id)) {
        const result = await followPlaylistAPI(item.id);
        if (result) {
          dispatch(followPlaylist(item)); // ✅ Redux action
        }
      } else {
        const result = await unfollowPlaylistAPI(item.id);
        if (result) {
          dispatch(unfollowPlaylist(item.id)); // ✅ Redux action
        }
      }
    } catch (err) {
      Alert.alert("Error", err.message);
    }
  }

  return (
    <FlatList
      data={playlists.filter((playlist) => playlist)}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <Pressable
          onPress={() => navigation.navigate("PlaylistScreen", { item })}
        >
          <View
            style={{
              marginBottom: 8,
              flexDirection: "row",
              alignItems: "center",
              gap: 8,
              marginVertical: 8,
              borderRadius: 8,
              padding: 5,
              backgroundColor: "#1c1c1e",
            }}
          >
            <Image
              style={{ width: 55, height: 55, borderRadius: 8 }}
              source={{ uri: item.images[0]?.url }}
            />
            <View
              style={{
                width: 240,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View>
                <Text
                  numberOfLines={1}
                  style={{
                    color: "white",
                    fontSize: 16,
                    paddingLeft: 8,
                    fontWeight: "bold",
                    width: 200,
                  }}
                >
                  {item?.name.length < 25
                    ? item?.name
                    : item?.name.slice(0, 25) + "..."}
                </Text>
                <Text
                  style={{
                    color: "gray",
                    fontSize: 14,
                    paddingLeft: 8,
                  }}
                >
                  {t("Playlist")}
                </Text>
              </View>
              <MaterialIcons
                onPress={() => handleFollowAPlaylist(item)}
                name={
                  followedPlaylistIds.includes(item.id)
                    ? "playlist-add-check"
                    : "playlist-add"
                }
                size={24}
                color={
                  followedPlaylistIds.includes(item.id) ? "green" : "white"
                }
              />
            </View>
          </View>
        </Pressable>
      )}
      contentContainerStyle={{ paddingBottom: 250 }}
      ListEmptyComponent={
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            height: 160,
          }}
        >
          <Text style={{ color: "white", fontSize: 18, fontWeight: "600" }}>
            {t("No Playlists Found")}
          </Text>
        </View>
      }
    />
  );
};

export default Playlists;

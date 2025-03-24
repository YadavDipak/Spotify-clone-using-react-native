import {
  Alert,
  FlatList,
  Image,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Entypo, Ionicons } from "@expo/vector-icons";

import { reduceUniqueSongs } from "../utils/getUniqueSongs";
import { getAlbumTracks } from "../services/album";

import { useTranslation } from "react-i18next";

const AlbumScreen = () => {
  const { t } = useTranslation();

  const navigation = useNavigation();
  const route = useRoute();
  const { item } = route.params;
  const [albumTracks, setAlbumTracks] = useState([]);

  useEffect(() => {
    const fetchAlbumTracks = async () => {
      try {
        const result = await getAlbumTracks(item.id, item.total_tracks);
        if (result) {
          setAlbumTracks(reduceUniqueSongs(result.items, "album"));
        }
      } catch (err) {
        Alert.alert("Error", err.message);
      }
    };
    fetchAlbumTracks();
  }, []);

  // console.log("item tracks -----------", item);
  return (
    <LinearGradient colors={["#040306", "#131624"]} style={{ flex: 1 }}>
      <SafeAreaView>
        <LinearGradient
          colors={["rgb(48, 25, 52)", "rgb(52, 52, 52)", "rgb(27, 18, 18)"]}
          style={{
            padding: 20,
          }}
        >
          {/* Go back icons */}
          <TouchableOpacity onPress={() => navigation.goBack()} style={{}}>
            <Ionicons name="arrow-back-outline" size={28} color="white" />
          </TouchableOpacity>

          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Image
              style={{ width: 200, height: 200 }}
              source={{ uri: item?.images[0].url }}
            />
          </View>
        </LinearGradient>

        <View style={{ padding: 16, gap: 8 }}>
          <Text style={{ color: "white", fontSize: 24, fontWeight: "bold" }}>
            {item?.name}
          </Text>
          <Text style={{ color: "gray" }}>
            {item.artists.length > 2
              ? item.artists
                  .slice(0, 2)
                  .map((artist) => artist.name)
                  .join(", ") + ` and ${item.artists.length - 2} others`
              : item.artists.map((artist) => artist.name).join(", ")}
          </Text>
        </View>

        <View style={{ paddingHorizontal: 16 }}>
          <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>
            {t("Album Hit")} {item.total_tracks} {t("Songs")}
          </Text>
          <FlatList
            style={{ marginTop: 20 }}
            data={albumTracks}
            keyExtractor={(item) => item?.id}
            renderItem={({ item }) => (
              <Pressable
                onPress={() => navigation.navigate("SongInfo", { item: item })}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: 8,
                  borderRadius: 6,
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  marginBottom: 10,
                }}
              >
                <View style={{ flex: 1 }}>
                  <Text
                    style={{ color: "white", fontSize: 16, fontWeight: "bold" }}
                    numberOfLines={1}
                  >
                    {item?.name || "Unknown Melody"}
                  </Text>
                  <Text
                    style={{ color: "gray", fontSize: 12 }}
                    numberOfLines={1}
                  >
                    {item.artists.map((artist) => artist.name).join(", ") ||
                      "Unknown Artist"}
                  </Text>
                </View>
                <Entypo name="dots-three-vertical" size={22} color="white" />
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
                  {t("No Tracks Found")}
                </Text>
              </View>
            }
          />
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default AlbumScreen;

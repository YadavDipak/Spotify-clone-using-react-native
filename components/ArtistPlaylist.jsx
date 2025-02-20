import { View, Text, Pressable, FlatList, Image } from "react-native";
import React from "react";
import { getCombinedList } from "../utils/getCombinedList";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const ArtistPlaylist = ({ playlists, artists, activeCategory }) => {
  const navigation = useNavigation();
  let combinedList = getCombinedList(playlists, artists, activeCategory);

  return (
    <View>
      <FlatList
        data={combinedList}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => {
              if (item.type !== "artist") {
                navigation.navigate("PlaylistScreen");
              }
            }}
            style={{
              marginBottom: 8,
              flexDirection: "row",
              alignItems: "center",
              gap: 8,
              borderRadius: 8,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.2,
              shadowRadius: 4,
              padding: 8,
              backgroundColor: "#202020",
            }}
          >
            <Image
              style={{
                width: 55,
                height: 55,
                borderRadius: item.type === "artist" ? 27.5 : 8,
              }}
              source={{ uri: item.images[0]?.url }}
            />

            <View>
              <Text
                style={{
                  color: "white",
                  fontSize: 22,
                  paddingLeft: 8,
                  fontWeight: "bold",
                  width: 250,
                }}
              >
                {item?.name.length < 30
                  ? item?.name
                  : item?.name.slice(0, 30) + "..."}
              </Text>
              <Text
                style={{
                  color: "#b3b3b3",
                  fontSize: 14,
                  paddingLeft: 8,
                  width: 250,
                }}
              >
                {item.type[0].toUpperCase() + item.type.slice(1)}
              </Text>
            </View>
          </Pressable>
        )}
        ListHeaderComponent={
          activeCategory !== "Artists" && (
            <Pressable
              onPress={() => navigation.navigate("Liked")}
              style={{
                marginBottom: 8,
                width: "100%",
                flexDirection: "row",
                alignItems: "center",
                gap: 20,
                padding: 8,
                backgroundColor: "#202020",
                borderRadius: 8,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.2,
                shadowRadius: 4,
                elevation: 4,
              }}
            >
              <LinearGradient
                colors={["#33006F", "#FFFFFF"]}
                style={{ borderRadius: 8 }}
              >
                <Pressable
                  style={{
                    width: 55,
                    height: 55,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <AntDesign name="heart" size={24} color="white" />
                </Pressable>
              </LinearGradient>

              <View>
                <Text
                  style={{ color: "white", fontSize: 14, fontWeight: "bold" }}
                >
                  Liked Songs
                </Text>
                <Text style={{ color: "#B3B3B3", fontSize: 14 }}>Playlist</Text>
              </View>
            </Pressable>
          )
        }
        contentContainerStyle={{ paddingBottom: 600 }}
        ListEmptyComponent={
          <View
            style={{
              height: 200,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ color: "white", fontSize: 24, fontWeight: "bold" }}>
              No items found
            </Text>
          </View>
        }
      />
    </View>
  );
};

export default ArtistPlaylist;

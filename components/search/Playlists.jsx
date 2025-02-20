import { View, Text, FlatList, Image } from "react-native";
import React from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const Playlists = ({ playlists }) => {
  return (
    <FlatList
      data={playlists.filter((playlist) => playlist)}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View
          style={{
            marginBottom: 8,
            flexDirection: "row",
            width: "100%",
            alignItems: "center",
            gap: 8,
            marginHorizontal: 8,
            marginVertical: 8,
            borderRadius: 8,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 4,
            padding: 8,
            backgroundColor: "#1c1c1e",
          }}
        >
          <Image
            style={{ width: 55, height: 55, borderRadius: 8 }}
            source={{
              uri: item.images[0]?.url,
            }}
          />
          <View
            style={{
              width: 250,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View>
              <Text
                style={{
                  color: "white",
                  fontSize: 22,
                  paddingLeft: 8,
                  fontWeight: "bold",
                  width: 210,
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
                  fontWeight: "600",
                }}
              >
                Playlist
              </Text>
            </View>
            <MaterialIcons name="playlist-add" size={24} color="white" />
          </View>
        </View>
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
            No Playlists Found
          </Text>
        </View>
      }
    />
  );
};

export default Playlists;

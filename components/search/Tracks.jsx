import { View, Text, FlatList, Image } from "react-native";
import React from "react";

const Tracks = ({ tracks }) => {
  return (
    <FlatList
      data={tracks}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View
          style={{
            marginBottom: 8,
            flexDirection: "row",
            width: "100%",
            alignItems: "center",
            gap: 15,
            marginHorizontal: 8,
            marginVertical: 8,
            backgroundColor: "#202020",
            borderRadius: 8,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 4,
            padding: 5,
          }}
        >
          <Image
            style={{ width: 55, height: 55, borderRadius: 8 }}
            source={{ uri: item.album.images[0]?.url }}
          />
          <View>
            <Text
              style={{
                color: "white",
                fontSize: 20,
                fontWeight: "bold",
                width: 250,
                paddingRight: 5,
              }}
            >
              {item?.name.length < 25
                ? item?.name
                : item?.name.slice(0, 25) + "..."}
            </Text>
            <Text
              style={{
                color: "white",
                fontSize: 12,
                fontWeight: "600",
                width: 250,
              }}
            >
              {item.album.artists[0]?.name.length < 25
                ? item.album.artists[0]?.name
                : item.album.artists[0]?.name.slice(0, 25) + "..."}
            </Text>
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
            No Tracks Found
          </Text>
        </View>
      }
    />
  );
};

export default Tracks;

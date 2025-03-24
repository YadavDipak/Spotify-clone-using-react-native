import React from "react";
import { View, Text, FlatList, Image, Pressable } from "react-native";

import { useNavigation } from "@react-navigation/native";

const Albums = ({ albums }) => {
  const navigation = useNavigation();

  return (
    <FlatList
      data={albums}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <Pressable
          onPress={() => {
            navigation.navigate("AlbumScreen", {
              item: item,
            });
          }}
        >
          <View
            style={{
              marginTop: 8,
              marginBottom: 8,
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              borderRadius: 8,
              padding: 5,
              backgroundColor: "#1c1c1e",
              width: "95%",
              alignItems: "center",
              alignSelf: "center",
            }}
          >
            <Image
              style={{ width: 55, height: 55, borderRadius: 8 }}
              source={{
                uri: item.images[0]?.url,
              }}
            />
            <View>
              <Text
                numberOfLines={1}
                style={{
                  color: "white",
                  fontSize: 16,
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
                  color: "gray",
                  fontSize: 14,
                  paddingLeft: 8,
                }}
              >
                {item?.artists.length > 0 &&
                  (item?.artists[0]?.name.length < 30
                    ? item?.artists[0]?.name
                    : item?.artists[0]?.name.slice(0, 30) + "...")}
              </Text>
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
            No Albums Found
          </Text>
        </View>
      }
    />
  );
};

export default Albums;

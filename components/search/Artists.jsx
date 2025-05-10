import { View, Text, FlatList, Image } from "react-native";
import React from "react";

const Artists = ({ artists }) => {
  return (
    <FlatList
      data={artists}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View
          style={{
            marginBottom: 8,
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
            marginVertical: 8,
            borderRadius: 8,
            padding: 5,
            backgroundColor: "#1c1c1e",
          }}
        >
          <Image
            style={{ width: 55, height: 55, borderRadius: 55 / 2 }}
            source={{
              uri: item.images[0]?.url
                ? item.images[0]?.url
                : "https://pinnacle.works/wp-content/uploads/2022/06/dummy-image.jpg",
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
              }}
            >
              {item?.name.length < 30
                ? item?.name
                : item?.name.slice(0, 30) + "..."}
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
            No Artists Found
          </Text>
        </View>
      }
    />
  );
};

export default Artists;

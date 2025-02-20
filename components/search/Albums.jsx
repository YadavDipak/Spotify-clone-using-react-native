import { View, Text, FlatList, Image } from "react-native";
import React from "react";

const Albums = ({ albums }) => {
  console.log("Printing the albums::==>>", albums);

  return (
    <FlatList
      data={albums}
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
                color: "gray",
                fontSize: 14,
                paddingLeft: 8,
                fontWeight: "600",
                width: 250,
              }}
            >
              {item?.artists.length > 0 &&
                (item?.artists[0]?.name.length < 30
                  ? item?.artists[0]?.name
                  : item?.artists[0]?.name.slice(0, 30) + "...")}
            </Text>
          </View>
        </View>
      )}
      contentContainerStyle={{ paddingBottom: 250 }} // Prevent last item from getting cut off
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

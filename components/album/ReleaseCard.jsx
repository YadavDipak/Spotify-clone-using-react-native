import { View, Text, Pressable, Image } from "react-native";
import React from "react";

const ReleaseCard = ({ item }) => {
  return (
    <Pressable style={{ padding: 12 }}>
      <Image
        style={{ width: 130, height: 130, borderRadius: 8 }}
        source={{ uri: item.images[0].url }}
      />
      <View style={{ width: 130, marginTop: 8 }}>
        <Text
          style={{
            fontSize: 13,
            fontWeight: "500",
            color: "white",
            textAlign: "center",
          }}
          numberOfLines={2}
          ellipsizeMode="tail"
        >
          {item?.name.split(" ").slice(0, 2).join(" ")}
        </Text>
      </View>
    </Pressable>
  );
};

export default ReleaseCard;

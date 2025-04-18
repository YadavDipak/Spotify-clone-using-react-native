import { Text, Pressable, Image, View } from "react-native";
import React from "react";

const RecentlyPlayedCard = ({ item }) => {
  return (
    <Pressable style={{ margin: 10 }}>
      <Image
        style={{ width: 130, height: 130, borderRadius: 5 }}
        source={{ uri: item.track.album.images[0].url }}
      />
      <View>
        <Text
          ellipsizeMode="tail"
          numberOfLines={1}
          style={{
            fontSize: 13,
            fontWeight: "500",
            color: "white",
            marginTop: 10,
            width: 130,
          }}
        >
          {item?.track?.name}
        </Text>
      </View>
    </Pressable>
  );
};

export default RecentlyPlayedCard;

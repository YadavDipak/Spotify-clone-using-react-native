import { Text, View, Image, Pressable } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const ArtistCard = ({ item }) => {
  const navigation = useNavigation();
  return (
    <View style={{ margin: 10 }}>
      <Pressable
        onPress={() => navigation.navigate("ArtistsScreen", { artist: item })}
      >
        <Image
          style={{ width: 130, height: 130, borderRadius: 5 }}
          source={{ uri: item.images[0].url }}
        />
        <Text
          style={{
            fontSize: 13,
            fontWeight: "500",
            color: "white",
            marginTop: 10,
          }}
        >
          {item?.name}
        </Text>
      </Pressable>
    </View>
  );
};

export default ArtistCard;

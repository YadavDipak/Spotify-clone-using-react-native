import { View, Text, FlatList, Image, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { getUsersTopItems } from "../services/user";
import { useNavigation } from "@react-navigation/native";

const TopTracks = () => {
  const [topTrack, setTopTracks] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchTopTrack = async () => {
      try {
        const type = "tracks";
        const result = await getUsersTopItems(type);

        if (result) {
          setTopTracks(result);
        }
      } catch (err) {
        Alert.alert("Error", err.message);
      }
    };

    fetchTopTrack();
  }, []);
  return (
    <>
      <View style={{ width: "100%" }}>
        <Text
          style={{
            color: "white",
            margin: 8,
            fontWeight: "bold",
            fontSize: 20,
          }}
        >
          Top Tracks
        </Text>
        <FlatList
          data={topTrack}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: "space-between" }}
          renderItem={({ item }) => {
            return (
              <Pressable
                onPress={() => navigation.navigate("SongInfo", { item })}
                style={{
                  width: "45%",
                  marginBottom: 8,
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 8,
                  backgroundColor: "#202020",
                  borderRadius: 8,
                  marginHorizontal: 8,
                  marginVertical: 8,
                  padding: 8,
                }}
              >
                <Image
                  style={{
                    width: 45,
                    height: 45,
                    borderRadius: 8,
                  }}
                  source={{ uri: item.album.images[0].url }}
                />

                <View>
                  <Text
                    ellipsizeMode="tail"
                    numberOfLines={1}
                    style={{
                      color: "white",
                      fontSize: 15,
                      fontWeight: "bold",
                      width: 80,
                      flexWrap: "wrap",
                    }}
                  >
                    {`${item?.name}`.slice(0, 15)}
                  </Text>
                  <Text
                    ellipsizeMode="tail"
                    numberOfLines={1}
                    style={{
                      color: "white",
                      fontSize: 10,
                      fontWeight: "500",
                      width: 50,
                      flexWrap: "wrap",
                    }}
                  >
                    {`${item.album.artists[0]?.name}`.slice(0, 15)}
                  </Text>
                </View>
              </Pressable>
            );
          }}
        />
      </View>
    </>
  );
};

export default TopTracks;

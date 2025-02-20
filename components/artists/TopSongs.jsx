import { Alert, FlatList, Image, Pressable, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { getArtistTopSongs } from "../../services/artist";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const TopSongs = ({ artistId }) => {
  const [topSongs, setTopSongs] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchArtistsTopSongs = async () => {
      try {
        const result = await getArtistTopSongs(artistId);

        if (result) {
          setTopSongs(result.tracks);
        }
      } catch (err) {
        Alert.alert("Error", err.message);
      }
    };

    fetchArtistsTopSongs();
  }, []);
  return (
    <>
      <FlatList
        style={{ marginTop: 20 }}
        data={topSongs}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => (
          <Pressable
            onPress={() => navigation.navigate("SongInfo", { item })}
            style={{
              marginBottom: 8,
              flexDirection: "row",
              width: "95%",
              alignItems: "center",
              gap: 8,
              marginHorizontal: 8,
              marginVertical: 8,
              borderRadius: 8,
              shadowColor: "#000",
              shadowOpacity: 0.2,
              shadowRadius: 4,
              padding: 8,
              backgroundColor: "#202020",
            }}
          >
            <View>
              <Text
                style={{
                  color: "white",
                  fontSize: 16,
                  fontWeight: "bold",
                  marginRight: 8,
                }}
              >
                {index + 1}
              </Text>
            </View>
            <Image
              style={{ width: 55, height: 55, borderRadius: 8 }}
              source={{ uri: item.album.images[0]?.url }}
            />
            <View
              style={{
                width: "75%",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View>
                <Text
                  style={{
                    color: "white",
                    fontSize: 20,
                    fontWeight: "bold",
                    width: 200,
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
                    width: 200,
                  }}
                >
                  {item.album.artists[0]?.name.length < 25
                    ? item.album.artists[0]?.name
                    : item.album.artists[0]?.name.slice(0, 25) + "..."}
                </Text>
              </View>
              <Entypo name="dots-three-vertical" size={22} color="white" />
            </View>
          </Pressable>
        )}
        contentContainerStyle={{ paddingBottom: 800 }}
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
    </>
  );
};

export default TopSongs;

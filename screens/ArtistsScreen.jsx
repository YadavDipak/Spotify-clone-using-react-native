import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React from "react";
import { useRoute } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import ShowArtistInfo from "../components/artists/ShowArtistInfo";
import { SafeAreaView } from "react-native-safe-area-context";

const ArtistsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const artist = route.params?.artist;

  if (!artist) return null;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
      {/* Back Button */}
      <View style={{ position: "absolute", top: 35, left: 10, zIndex: 10 }}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            backgroundColor: "rgba(0,0,0,0.5)",
            borderRadius: 50,
            padding: 8,
          }}
        >
          <Ionicons name="arrow-back-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Use FlatList instead of ScrollView */}
      <FlatList
        data={[]}
        keyExtractor={() => "Random Artist"}
        ListHeaderComponent={
          <>
            <Image
              style={{
                width: "100%",
                height: 300,
                alignSelf: "center",
              }}
              source={{ uri: artist.images[0]?.url }}
            />
            <Text
              numberOfLines={1}
              style={{
                position: "absolute",
                color: "white",
                fontSize: 35,
                fontWeight: "bold",
                textAlign: "center",
                alignSelf: "center",
                marginTop: 240,
              }}
            >
              {artist.name}
            </Text>

            <View style={{ width: "100%", padding: 10 }}>
              <Text
                style={{
                  color: "gray",
                  marginTop: 5,
                  fontSize: 15,
                  fontWeight: "bold",
                }}
              >
                Followers: {artist.followers.total.toLocaleString()}
              </Text>

              <Text
                style={{
                  color: "gray",
                  marginTop: 5,
                  fontWeight: "bold",
                  fontSize: 20,
                }}
              >
                Genres:{" "}
                <Text style={{ fontSize: 15 }}>{artist.genres.join(", ")}</Text>
              </Text>
            </View>
          </>
        }
        ListFooterComponent={
          <View style={{ paddingBottom: 20 }}>
            <ShowArtistInfo artistId={artist.id} />
          </View>
        }
      />
    </SafeAreaView>
  );
};

export default ArtistsScreen;

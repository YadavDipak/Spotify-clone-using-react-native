import {
  View,
  Text,
  ScrollView,
  Pressable,
  TextInput,
  Alert,
  ActivityIndicator,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import {
  AntDesign,
  MaterialCommunityIcons,
  Ionicons,
  Entypo,
} from "@expo/vector-icons";

import { getLikedTracks } from "../services/user";
import SongItem from "../components/SongItem";

const LikedSongsScreen = () => {
  const navigation = useNavigation();
  const [input, setInput] = useState("");
  const [likedTracks, savedLikedTracks] = useState([]);
  const [searchedTracks, setSearchedTracks] = useState([]);

  function handleSearch(text) {
    const filteredTracks = likedTracks.filter((item) =>
      item.track.name.toLowerCase().includes(text.toLowerCase())
    );
    setSearchedTracks(filteredTracks);
  }

  const handleInputChange = (text) => {
    setInput(text);
    handleSearch(text);
  };

  useEffect(() => {
    const fetchLikedTracks = async () => {
      try {
        const result = await getLikedTracks();

        if (result) {
          savedLikedTracks(result);
          setSearchedTracks(result);
        }
      } catch (err) {
        Alert.alert("Error", err.message);
      }
    };

    fetchLikedTracks();
  }, []);

  return (
    <>
      <LinearGradient colors={["#614385", "#516395"]} style={{ flex: 1 }}>
        <ScrollView style={{ flex: 1, marginTop: 50 }}>
          <Pressable
            onPress={() => navigation.goBack()}
            style={{ marginHorizontal: 10 }}
          >
            <Ionicons name="arrow-back" size={24} color="white" />
          </Pressable>
          <Pressable
            style={{
              marginHorizontal: 10,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: 9,
            }}
          >
            <Pressable
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
                backgroundColor: "#42275a",
                flex: 1,
                borderRadius: 3,
                height: 40,
                paddingLeft: 10,
              }}
            >
              {/* Search Input Container */}
              <AntDesign name="search1" size={20} color="white" />
              <TextInput
                value={input}
                onChangeText={handleInputChange}
                placeholder="Find in Liked songs"
                placeholderTextColor="white"
                style={{
                  fontWeight: "500",
                  color: "white",
                  height: "45px",
                }}
              />
            </Pressable>
            <Pressable
              style={{
                marginHorizontal: 10,
                backgroundColor: "#42275a",
                padding: 10,
                borderRadius: 3,
                height: 40,
              }}
            >
              <Text style={{ color: "white" }}>Sort</Text>
            </Pressable>
          </Pressable>
          <View style={{ height: 50 }} />
          <View style={{ marginHorizontal: 10 }}>
            <Text style={{ fontSize: 18, fontWeight: "bold", color: "white" }}>
              Liked Songs
            </Text>
            <Text style={{ color: "white", fontSize: 13, marginTop: 5 }}>
              {likedTracks.length} songs
            </Text>
          </View>
          {/* Icons */}
          <Pressable
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginHorizontal: 10,
            }}
          >
            <Pressable
              style={{
                width: 30,
                height: 30,
                borderRadius: 15,
                backgroundColor: "#1DB954",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <AntDesign name="arrowdown" size={20} color="white" />
            </Pressable>

            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
            >
              <MaterialCommunityIcons
                name="cross-bolnisi"
                size={24}
                color="#1DB954"
              />
              <Pressable
                //   onPress={playTrack}
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 30,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#1DB954",
                }}
              >
                <Entypo name="controller-play" size={24} color="white" />
              </Pressable>
            </View>
          </Pressable>
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            {searchedTracks.length === 0 ? (
              <ActivityIndicator size="large" color="gray" />
            ) : searchedTracks.length < likedTracks.length ? (
              <FlatList
                data={searchedTracks}
                renderItem={({ item }) => <SongItem item={item} />}
                showsVerticalScrollIndicator={false}
                scrollEnabled={false}
              />
            ) : (
              <FlatList
                data={likedTracks}
                renderItem={({ item }) => <SongItem item={item} />}
                showsVerticalScrollIndicator={false}
                scrollEnabled={false}
              />
            )}
          </ScrollView>
        </ScrollView>
      </LinearGradient>
    </>
  );
};
export default LikedSongsScreen;

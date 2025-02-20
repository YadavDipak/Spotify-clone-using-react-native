import {
  View,
  Text,
  TextInput,
  Alert,
  Pressable,
  BackHandler,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import TopTracks from "../components/TopTracks";
import { getCategorizedResult } from "../services/search";
import ShowSearchResults from "../components/search/ShowSearchResults";

const SearchScreen = () => {
  const [searchText, setSearchText] = useState("");
  const [isSearchInputFocused, setIsSearchInputFocused] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  const inputRef = useRef(null);

  const handleTextChange = async (text) => {
    setSearchText(text);
  };

  const handleInputBlur = () => {
    if (inputRef.current) {
      inputRef.current.blur();
      setIsSearchInputFocused(false);
      setSearchText("");
    }
  };

  const handleSearch = async () => {
    try {
      const result = await getCategorizedResult(searchText);
      if (result) {
        setSearchResults(result);
      }
    } catch (err) {
      Alert.alert("Error", err.message);
    }
  };

  useEffect(() => {
    const onBackPress = () => {
      if (isSearchInputFocused) {
        handleInputBlur();
        return true;
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      onBackPress
    );
    return () => backHandler.remove();
  }, [isSearchInputFocused]);

  return (
    <LinearGradient colors={["#040306", "#131624"]} style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1, paddingHorizontal: 16, paddingBottom: 52 }}>
          <View
            style={{
              width: "100%",
              marginTop: 20,
              marginBottom: 10,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text style={{ color: "white", fontSize: 30, fontWeight: "bold" }}>
              Search
            </Text>
          </View>

          <View
            style={{
              position: "relative",
              width: "100%",
              justifyContent: "center",
            }}
          >
            <Pressable
              onPress={handleInputBlur}
              style={{ position: "absolute", zIndex: 10, marginLeft: 16 }}
            >
              <Ionicons
                name={isSearchInputFocused ? "arrow-back" : "search-outline"}
                size={25}
                color="black"
              />
            </Pressable>

            <TextInput
              ref={inputRef}
              onFocus={() => setIsSearchInputFocused(true)}
              onBlur={handleSearch}
              onChangeText={handleTextChange}
              value={searchText}
              style={{
                backgroundColor: "white",
                paddingLeft: 56,
                fontSize: 16,
                fontWeight: "600",
                borderRadius: 10,
                height: 60,
              }}
              placeholder="What do you want to listen to?"
              placeholderTextColor="rgba(0, 0, 0, 0.8)"
            />
          </View>

          {!isSearchInputFocused && searchText.trim().length === 0 ? (
            <TopTracks />
          ) : (
            <ShowSearchResults searchResults={searchResults} />
          )}
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default SearchScreen;

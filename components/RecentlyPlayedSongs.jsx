import { View, Text, FlatList, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import RecentlyPlayedCard from "./RecentlyPlayedCard";
import { getRecentlyPlayed } from "../services/user";

const RecentlyPlayedSongs = () => {
  const [recentlyPlayed, setRecentlyPlayed] = useState([]);

  useEffect(() => {
    const fetchRecentlyPlayed = async () => {
      try {
        const result = await getRecentlyPlayed();

        if (result) {
          setRecentlyPlayed(result);
        }
      } catch (err) {
        Alert.alert("Error", err.message);
      }
    };

    fetchRecentlyPlayed();
  }, []);

  return (
    <>
      <View style={{ height: 10 }} />
      <Text
        style={{
          color: "white",
          fontSize: 19,
          fontWeight: "bold",
          marginHorizontal: 10,
          marginTop: 10,
        }}
      >
        Recently Played
      </Text>
      <FlatList
        data={recentlyPlayed}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <RecentlyPlayedCard item={item} key={index} />
        )}
      />
    </>
  );
};

export default RecentlyPlayedSongs;

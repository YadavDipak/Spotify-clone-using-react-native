import React, { useState } from "react";
import { View, Text, Pressable } from "react-native";

import Tracks from "./Tracks";
import Artists from "./Artists";
import Albums from "./Albums";
import Playlists from "./Playlists";

const ShowSearchResults = ({ searchResults }) => {
  const [selected, setSelected] = useState("Tracks");
  const filters = ["Tracks", "Artists", "Albums", "Playlists"];

  console.log("Printing the searchResult ------------", searchResults);

  return (
    <>
      {Object.entries(searchResults).length > 0 && (
        <View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingTop: 10,
              paddingBottom: 8,
            }}
          >
            {filters.map((filter) => {
              return (
                <Pressable
                  key={filter}
                  onPress={() => setSelected(filter)}
                  style={{
                    backgroundColor:
                      selected === filter ? "#309635" : "#282828",
                    padding: 8,
                    borderRadius: 50,
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      fontSize: 16,
                    }}
                  >
                    {filter}
                  </Text>
                </Pressable>
              );
            })}
          </View>
          {selected === "Tracks" && (
            <Tracks tracks={searchResults?.tracks?.items} />
          )}
          {selected === "Albums" && (
            <Albums albums={searchResults?.albums?.items} />
          )}
          {selected === "Playlists" && (
            <Playlists playlists={searchResults?.playlists?.items} />
          )}
          {selected === "Artists" && (
            <Artists artists={searchResults?.artists?.items} />
          )}
        </View>
      )}
    </>
  );
};

export default ShowSearchResults;

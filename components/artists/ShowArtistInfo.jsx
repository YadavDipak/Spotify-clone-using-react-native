import { View, Text, Pressable } from "react-native";
import React, { useState } from "react";
import TopSongs from "./TopSongs";
import ShowArtistAlbum from "./ShowArtistAlbum";

const ShowArtistInfo = ({ artistId }) => {
  const [selected, setSelected] = useState("Top songs");
  const filters = ["Top songs", "Albums"];

  return (
    <View style={{ paddingBottom: 80 }}>
      <View
        style={{ flexDirection: "row", width: "100%", gap: 24, padding: 12 }}
      >
        {filters.map((filter) => {
          return (
            <Pressable key={filter} onPress={() => setSelected(filter)}>
              <Text
                style={{
                  color: "white",
                  fontSize: 18,
                  fontWeight: selected === filter ? "bold" : "normal",
                }}
              >
                {filter}
              </Text>
              {selected == filter && (
                <View
                  style={{
                    marginTop: 9,
                    width: "auto",
                    height: 2,
                    backgroundColor: "green",
                  }}
                />
              )}
            </Pressable>
          );
        })}
      </View>

      {selected === "Top songs" && <TopSongs artistId={artistId} />}
      {selected === "Albums" && <ShowArtistAlbum artistId={artistId} />}
    </View>
  );
};

export default ShowArtistInfo;

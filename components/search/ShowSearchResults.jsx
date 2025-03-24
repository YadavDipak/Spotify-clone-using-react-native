import React, { useState } from "react";
import { View, Text, Pressable } from "react-native";
import { useTranslation } from "react-i18next";

import Tracks from "./Tracks";
import Artists from "./Artists";
import Albums from "./Albums";
import Playlists from "./Playlists";

const ShowSearchResults = ({ searchResults }) => {
  const { t } = useTranslation();

  const filters = [
    { key: "tracks", label: t("Tracks") },
    { key: "artists", label: t("Artists") },
    { key: "albums", label: t("Albums") },
    { key: "playlists", label: t("Playlists") },
  ];

  const [selected, setSelected] = useState("tracks");

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
              width: 150,
            }}
          >
            {filters.map(({ key, label }) => (
              <Pressable
                key={key}
                onPress={() => setSelected(key)}
                style={{
                  backgroundColor: selected === key ? "#309635" : "#282828",
                  padding: 8,
                  borderRadius: 50,
                }}
              >
                <Text
                  numberOfLines={1}
                  style={{ color: "white", fontSize: 14 }}
                >
                  {label}
                </Text>
              </Pressable>
            ))}
          </View>

          {selected === "tracks" && (
            <Tracks tracks={searchResults?.tracks?.items} />
          )}
          {selected === "albums" && (
            <Albums albums={searchResults?.albums?.items} />
          )}
          {selected === "playlists" && (
            <Playlists playlists={searchResults?.playlists?.items} />
          )}
          {selected === "artists" && (
            <Artists artists={searchResults?.artists?.items} />
          )}
        </View>
      )}
    </>
  );
};

export default ShowSearchResults;

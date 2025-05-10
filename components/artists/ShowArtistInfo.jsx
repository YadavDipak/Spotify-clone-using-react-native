import React, { useState } from "react";
import { View, Text, Pressable } from "react-native";

import { useTranslation } from "react-i18next";

import TopSongs from "./TopSongs";
import ShowArtistAlbum from "./ShowArtistAlbum";

const ShowArtistInfo = ({ artistId }) => {
  const { t } = useTranslation();
  const [selected, setSelected] = useState("Top Songs");
  const filters = [t("Top Songs"), t("Albums")];

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
                    height: 2,
                    backgroundColor: "green",
                  }}
                />
              )}
            </Pressable>
          );
        })}
      </View>

      {selected === t("Top Songs") && <TopSongs artistId={artistId} />}
      {selected === t("Albums") && <ShowArtistAlbum artistId={artistId} />}
    </View>
  );
};

export default ShowArtistInfo;

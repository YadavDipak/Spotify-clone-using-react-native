import { Text, Alert, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { getUsersTopItems } from "../../services/user";
import ArtistCard from "./ArtistsCard";

import { useTranslation } from "react-i18next";

const TopArtists = () => {
  const { t } = useTranslation();
  const [topArtists, setTopArtists] = useState([]);

  useEffect(() => {
    async function fetchTopArtists() {
      try {
        const type = "artists";
        const result = await getUsersTopItems(type);

        if (result) {
          setTopArtists(
            result.length > 0
              ? result
              : [
                  {
                    images: [
                      {
                        url: "https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228",
                        height: 300,
                        width: 300,
                      },
                    ],
                    name: "Random Artist",
                  },
                ]
          );
        }
      } catch (err) {
        Alert.alert("Error", err.message);
      }
    }

    fetchTopArtists();
  }, [t]);

  console.log("Top Artists-------------------------------------", topArtists);

  return (
    <>
      <Text
        style={{
          color: "white",
          fontSize: 19,
          fontWeight: "bold",
          marginHorizontal: 10,
          marginTop: 10,
        }}
      >
        {t("Your Top Artists")}
      </Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {topArtists.map((item, index) => (
          <ArtistCard item={item} key={index} />
        ))}
      </ScrollView>
    </>
  );
};

export default TopArtists;

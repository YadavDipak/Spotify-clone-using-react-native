import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import ReleaseCard from "./ReleaseCard";
import { getNewReleases } from "../../services/album";

import { useTranslation } from "react-i18next";

const NewReleases = () => {
  const { t } = useTranslation();

  const [newReleases, setNewReleases] = useState([]);

  useEffect(() => {
    const fetchNewReleases = async () => {
      try {
        const result = await getNewReleases();
        if (result) {
          setNewReleases(result);
        }
      } catch (err) {}
    };

    fetchNewReleases();
  }, []);

  return (
    <>
      <View style={{ height: 10 }} />
      <Text
        style={{
          color: "white",
          fontSize: 19,
          fontWeight: "bold",
          marginHorizontal: 8,
          marginTop: 8,
        }}
      >
        {t("New Releases")}
      </Text>
      <FlatList
        data={newReleases}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <ReleaseCard item={item} key={index} />
        )}
      />
    </>
  );
};

export default NewReleases;

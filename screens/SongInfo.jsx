import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Pressable,
  Alert,
  Share,
  StyleSheet,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import {
  Ionicons,
  MaterialCommunityIcons,
  AntDesign,
  MaterialIcons,
  Entypo,
} from "@expo/vector-icons";
import { ProgressBar } from "react-native-paper";
import { useEffect, useState } from "react";

import { getTrackData } from "../services/track";

const SongInfo = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { item, id } = route.params;
  const [trackData, setTrackData] = useState(item || null);
  const [toggle, setToggle] = useState(true);
  const [isLiked, setIsLiked] = useState(false);

  async function handleShareClick() {
    try {
      const url = `https://spotify-web-ruby.vercel.app/app/SongInfo/${trackData?.id}`;

      await Share.share({
        message: `🎵 I'm enjoying *"${trackData.name}"* by *${trackData.artists
          .map((artist) => artist.name)
          .join(", ")}* on Spotify! 🎧\n\nCheck it out here: ${url}`,
      });
    } catch (err) {
      Alert.alert("Error", err.message);
    }
  }

  useEffect(() => {
    async function fetchTrackData(trackId) {
      try {
        const response = await getTrackData(trackId);
        if (response) {
          setTrackData(response);
        }
      } catch (err) {
        Alert.alert("Error", err.message);
      }
    }
    if (id) fetchTrackData(id);
  }, [route.params]);

  return (
    <LinearGradient
      colors={["#F3FF33", "black"]}
      start={{ x: 0.2, y: -0.7 }}
      end={{ x: 0.2, y: 0.85 }}
      style={styles.container}
    >
      {trackData && (
        <View style={styles.wrapper}>
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() =>
                navigation.canGoBack()
                  ? navigation.goBack()
                  : navigation.navigate("Main")
              }
            >
              <Ionicons name="arrow-back-outline" size={28} color="white" />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleShareClick}>
              <Entypo name="share" size={24} color="white" />
            </TouchableOpacity>
          </View>
          <View style={styles.imageContainer}>
            <Image
              source={{
                uri:
                  trackData?.album?.images?.[0]?.url ||
                  "https://static.vecteezy.com/system/resources/previews/002/249/673/non_2x/music-note-icon-song-melody-tune-flat-symbol-free-vector.jpg",
              }}
              style={styles.albumImage}
              resizeMode="cover"
            />
          </View>
          <View style={styles.infoContainer}>
            <View>
              <Text style={styles.trackTitle}>
                {trackData?.name.length > 20
                  ? trackData?.name.slice(0, 20) + "..."
                  : trackData?.name}
              </Text>
              <View style={styles.artistContainer}>
                <Ionicons name="sparkles-sharp" size={10} color="#1dd661" />
                <Text
                  style={styles.artistText}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {trackData?.artists?.map((artist) => artist.name).join(", ")}
                </Text>
              </View>
              <View style={styles.albumContainer}>
                <MaterialCommunityIcons
                  name="album"
                  size={20}
                  color="#1dd661"
                />
                <Text style={styles.albumText}>
                  {trackData?.album?.name.length > 25
                    ? trackData?.album?.name.slice(0, 25) + "..."
                    : trackData?.album?.name}
                </Text>
              </View>
            </View>
            <View style={styles.likeContainer}>
              <Ionicons name="add-circle-outline" size={35} color="white" />
              <Pressable>
                <AntDesign
                  name="heart"
                  size={24}
                  color={isLiked ? "#1DB954" : "white"}
                />
              </Pressable>
            </View>
          </View>
          <View style={styles.progressBarContainer}>
            <ProgressBar
              progress={Math.random()}
              color="#1dd661"
              style={styles.progressBar}
            />
            <View style={styles.timerContainer}>
              <Text style={styles.timerText}>1:00</Text>
              <Text style={styles.timerText}>3:44</Text>
            </View>
          </View>
          <View style={styles.controlsContainer}>
            <MaterialCommunityIcons
              name="skip-previous"
              size={40}
              color="white"
            />
            <TouchableOpacity onPress={() => setToggle(!toggle)}>
              {toggle ? (
                <Ionicons name="play-circle-sharp" size={75} color="white" />
              ) : (
                <Ionicons name="pause-circle" size={75} color="white" />
              )}
            </TouchableOpacity>
            <MaterialIcons name="skip-next" size={40} color="white" />
          </View>
        </View>
      )}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "flex-end", alignItems: "center" },
  wrapper: { width: "85%", height: "100%" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 16,
  },
  imageContainer: { alignItems: "center", marginTop: 50 },
  albumImage: { width: "100%", height: 250, borderRadius: 10 },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 40,
  },
  trackTitle: { color: "white", fontSize: 20, fontWeight: "bold" },
  artistContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginTop: 4,
  },
  artistText: { color: "gray", fontSize: 14, width: 180 },
  albumContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginTop: 8,
  },
  albumText: { color: "gray", fontSize: 14 },
  likeContainer: { flexDirection: "row", gap: 20, alignItems: "center" },
  progressBarContainer: { marginTop: 20 },
  progressBar: { height: 4, borderRadius: 4 },
  timerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 4,
  },
  timerText: { color: "gray", fontSize: 12 },
  controlsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 40,
    marginTop: 20,
  },
});

export default SongInfo;

import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Pressable,
  Alert,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import {
  Ionicons,
  MaterialCommunityIcons,
  AntDesign,
  MaterialIcons,
} from "@expo/vector-icons";
import { ProgressBar } from "react-native-paper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchLikedSongs,
  addLikedSong,
  removeLikedSong,
} from "../src/redux/slices/likedSongsSlice";
import {
  removeTrackFromCurrentUser,
  saveTrackForCurrentUser,
} from "../services/user";

const SongInfo = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { item } = route.params;
  const dispatch = useDispatch();

  // Get liked tracks from Redux store
  const likedTracks = useSelector(
    (state) => state.likedSongs?.likedTracks || []
  );

  const [toggle, setToggle] = useState(true);

  // Check if song is liked
  const isLiked = likedTracks.some((track) => track.id === item.id);

  async function handleSongLike() {
    try {
      if (isLiked) {
        const result = await removeTrackFromCurrentUser(item.id);
        if (result) {
          dispatch(removeLikedSong(item.id));
        }
      } else {
        const result = await saveTrackForCurrentUser(item.id);
        if (result) {
          dispatch(addLikedSong(item));
        }
      }
    } catch (err) {
      Alert.alert("Error", err.message);
    }
  }

  return (
    <LinearGradient
      colors={["#F3FF33", "#040306"]}
      style={{ flex: 1, alignItems: "center" }}
    >
      <View style={{ width: "85%", height: "100%" }}>
        {/* Go back icons */}
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ marginTop: 40 }}
        >
          <Ionicons name="arrow-back-outline" size={28} color="black" />
        </TouchableOpacity>

        {/* Image Container */}
        <View style={{ alignItems: "center" }}>
          <Image
            source={{
              uri:
                item?.album?.images?.[0]?.url ||
                "https://static.vecteezy.com/system/resources/previews/002/249/673/non_2x/music-note-icon-song-melody-tune-flat-symbol-free-vector.jpg",
            }}
            style={{
              width: "100%",
              height: 288,
              borderRadius: 8,
              marginTop: 20,
            }}
            resizeMode="cover"
          />
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 10,
          }}
        >
          <View style={{ marginTop: 24 }}>
            <Text
              style={{
                color: "white",
                fontSize: 20,
                fontWeight: "bold",
                width: 220,
              }}
            >
              {item?.name}
            </Text>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 4 }}
            >
              <Ionicons name="sparkles-sharp" size={10} color="#1dd661" />
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={{ color: "gray", fontSize: 14, width: 200 }}
              >
                {item?.artists?.map((artist) => artist.name).join(", ")}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 4,
                marginTop: 8,
              }}
            >
              <MaterialCommunityIcons name="album" size={20} color="#1dd661" />
              <Text style={{ color: "gray", fontSize: 14, width: 200 }}>
                {item?.album?.name}
              </Text>
            </View>
          </View>

          {/* Like/Unlike Icons */}
          <View style={{ flexDirection: "row", gap: 24, alignItems: "center" }}>
            <Ionicons name="add-circle-outline" size={35} color="white" />
            <Pressable onPress={handleSongLike}>
              <AntDesign
                name="heart"
                size={24}
                color={isLiked ? "#1DB954" : "white"}
              />
            </Pressable>
          </View>
        </View>

        {/* Progress Bar */}
        <View style={{ marginTop: 32 }}>
          <ProgressBar
            progress={Math.random()}
            color="#1dd661"
            style={{ height: 4, borderRadius: 4 }}
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 4,
            }}
          >
            <Text style={{ color: "gray", fontSize: 10 }}>0:00</Text>
            <Text style={{ color: "gray", fontSize: 10 }}>4:54</Text>
          </View>
        </View>

        {/* Left, Start, Stop, Right Icons */}
        <View
          style={{
            flexDirection: "row",
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
            gap: 32,
          }}
        >
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
    </LinearGradient>
  );
};

export default SongInfo;

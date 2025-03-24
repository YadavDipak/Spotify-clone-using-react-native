import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getLikedTracks } from "../../../services/user";
import { Alert } from "react-native";

// Async Thunk to Fetch Liked Songs
export const fetchLikedSongs = createAsyncThunk(
  "likedSongs/fetchLikedSongs",
  async (_, { rejectWithValue }) => {
    try {
      const result = await getLikedTracks();
      return result;
    } catch (err) {
      Alert.alert("Error", err.message);
      return rejectWithValue(err.message);
    }
  }
);

const likedSongsSlice = createSlice({
  name: "likedSongs",
  initialState: {
    likedTracks: [],
    status: "idle",
    error: null,
  },
  reducers: {
    setLikedSongs: (state, action) => {
      state.likedTracks = action.payload;
    },
    addLikedSong: (state, action) => {
      state.likedTracks.push(action.payload);
    },
    removeLikedSong: (state, action) => {
      state.likedTracks = state.likedTracks.filter(
        (song) => song.id !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLikedSongs.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchLikedSongs.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.likedTracks = action.payload;
      })
      .addCase(fetchLikedSongs.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { setLikedSongs, addLikedSong, removeLikedSong } =
  likedSongsSlice.actions;
export default likedSongsSlice.reducer;

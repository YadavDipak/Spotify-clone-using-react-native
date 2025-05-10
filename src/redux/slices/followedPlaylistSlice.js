import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUsersPlaylist } from "../../../services/user";
import { Alert } from "react-native";

// Async Thunk to Fetch Followed Playlists
export const fetchFollowedPlaylists = createAsyncThunk(
  "followedPlaylists/fetchFollowedPlaylists",
  async (_, { rejectWithValue }) => {
    try {
      const result = await getUsersPlaylist();
      return result;
    } catch (err) {
      Alert.alert("Error", err.message);
      return rejectWithValue(err.message);
    }
  }
);

const followedPlaylistSlice = createSlice({
  name: "followedPlaylists",
  initialState: {
    followedPlaylists: [],
    status: "idle",
    error: null,
  },
  reducers: {
    setFollowedPlaylists: (state, action) => {
      state.followedPlaylists = action.payload;
    },
    followPlaylist: (state, action) => {
      state.followedPlaylists.push(action.payload);
    },
    unfollowPlaylist: (state, action) => {
      state.followedPlaylists = state.followedPlaylists.filter(
        (playlist) => playlist.id !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFollowedPlaylists.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchFollowedPlaylists.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.followedPlaylists = action.payload;
      })
      .addCase(fetchFollowedPlaylists.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { setFollowedPlaylists, followPlaylist, unfollowPlaylist } =
  followedPlaylistSlice.actions;
export default followedPlaylistSlice.reducer;

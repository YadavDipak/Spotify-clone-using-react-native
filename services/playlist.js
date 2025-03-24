import { axiosRequest } from "./apiConnector";
import { PLAYLIST_ENDPOINTS } from "./apiEndpoints";

const {
  GET_PLAYLIST,
  GET_PLAYLIST_TRACKS,
  FOLLOW_PLAYLIST,
  UNFOLLOW_PLAYLIST,
} = PLAYLIST_ENDPOINTS;

// Function to get playlist details
export async function getPlaylist(playlistId) {
  try {
    const response = await axiosRequest(
      "GET",
      `${GET_PLAYLIST}/${playlistId}`,
      null,
      null,
      {}
    );
    console.log("playlistId -------", playlistId);
    console.log("response.data", response.data);

    if (!response?.data) {
      throw new Error("Unexpected response format");
    }

    return response.data;
  } catch (err) {
    throw new Error("Error fetching playlist details.");
  }
}

// Function to get playlist songs
export async function getPlaylistSongs(playlistId, limit) {
  try {
    const response = await axiosRequest(
      "GET",
      GET_PLAYLIST_TRACKS + `/${playlistId}/tracks`,
      null,
      null,
      {
        limit: 50,
        offset: 0,
      }
    );

    if (!response?.data) {
      throw new Error("Unexpected response format");
    }

    return response.data;
  } catch (err) {
    throw new Error("Error in fetching Playlist songs");
  }
}

// function to follow a playlist
export async function followPlaylist(playlistId) {
  try {
    const response = await axiosRequest(
      "PUT",
      FOLLOW_PLAYLIST + `/${playlistId}/followers`,
      null,
      null,
      {}
    );

    if (response.status === 200) {
      return true;
    }
  } catch (err) {
    throw new Error("Error in following a playlist");
  }
}

// function to unfollow a playlist
export async function unfollowPlaylist(playlistId) {
  try {
    const response = await axiosRequest(
      "DELETE",
      UNFOLLOW_PLAYLIST + `/${playlistId}/followers`,
      null,
      null,
      {}
    );

    if (response.status === 200) {
      return true;
    }
  } catch (err) {
    throw new Error("Error while unfollowing a playlist");
  }
}

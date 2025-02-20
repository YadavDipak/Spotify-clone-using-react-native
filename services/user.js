import { axiosRequest } from "./apiConnector";
import { USER_ENDPOINTS } from "./apiEndpoints";

const {
  GET_CURRENT_USER,
  GET_TOP_ITEMS,
  GET_RECENTLY_PLAYED,
  GET_LIKED_TRACKS,
  GET_FOLLOWED_ARTIST,
  GET_USERS_PLAYLISTS,
} = USER_ENDPOINTS;

// function to get current users's profile
export async function getCurrentUser() {
  try {
    let response = await axiosRequest("GET", GET_CURRENT_USER, null, null, {});

    if (!response?.data) {
      throw new Error("Unexpected response format");
    }
    return response.data;
  } catch (err) {
    throw new Error(err.message);
  }
}

// function to get current users's top items
export async function getUsersTopItems(type) {
  try {
    let response = await axiosRequest(
      "GET",
      GET_TOP_ITEMS + "/" + type,
      null,
      null,
      {
        limit: 3,
      }
    );

    if (!response?.data) {
      throw new Error("Unexpected response format");
    }
    return response.data?.items;
  } catch (err) {
    throw new Error(err.message);
  }
}

// function to get current users's recently played
export async function getRecentlyPlayed() {
  try {
    let response = await axiosRequest("GET", GET_RECENTLY_PLAYED, null, null, {
      limit: 4,
    });

    if (!response?.data) {
      throw new Error("Unexpected response format");
    }
    return response.data?.items;
  } catch (err) {
    throw new Error(err.message);
  }
}

// function to get user's like songs
export async function getLikedTracks() {
  try {
    let response = await axiosRequest("GET", GET_LIKED_TRACKS, null, null, {
      limit: 40,
    });

    if (!response?.data) {
      throw new Error("Unexpected response format");
    }
    return response.data?.items;
  } catch (err) {
    throw new Error("Error in getting the Liked Songs");
  }
}

// function to get the followed artists
export async function getFollowedArtists() {
  try {
    let response = await axiosRequest("GET", GET_FOLLOWED_ARTIST, null, null, {
      type: "artist",
      limit: 10,
    });

    if (!response?.data) {
      throw new Error("Unexpected response format");
    }
    return response.data;
  } catch (err) {
    throw new Error("Error in getting the user's followed artists");
  }
}

// function to get the user's playlist
export async function getUsersPlaylist() {
  try {
    let response = await axiosRequest("GET", GET_USERS_PLAYLISTS, null, null, {
      limit: 10,
    });

    if (!response?.data) {
      throw new Error("Unexpected response format");
    }
    return response.data?.items;
  } catch (err) {
    throw new Error("Error in getting the user's playlist");
  }
}

import { axiosRequest } from "./apiConnector";
import { ARTIST_ENDPOINTS } from "./apiEndpoints";

const { GET_ARTIST_ALBUMS, GET_ARTIST_RELATED_ARTIST, GET_ARTIST_TOP_SONGS } =
  ARTIST_ENDPOINTS;

//function to get new artist's top songs
export async function getArtistTopSongs(artistId) {
  try {
    const response = await axiosRequest(
      "GET",
      GET_ARTIST_TOP_SONGS + `/${artistId}/top-tracks`,
      null,
      null,
      {
        limit: 10,
        offset: 0,
      }
    );
    if (!response?.data) {
      throw new Error("Unexpected response format");
    }
    return response.data;
  } catch (err) {
    throw new Error("Error in fetching Artist top songs.");
  }
}

// function to get related artist
export async function getRelatedArtist(artistId) {
  try {
    const response = await axiosRequest(
      "GET",
      GET_ARTIST_RELATED_ARTIST + `/${artistId}/related-artists`,
      null,
      null,
      {
        limit: 10,
        offset: 0,
      }
    );
    if (!response?.data) {
      throw new Error("Unexpected response format");
    }
    return response.data;
  } catch (err) {
    throw new Error("Error in fetching related Artist.");
  }
}

// function to artist's albums
export async function getArtistAlbums(artistId) {
  try {
    const response = await axiosRequest(
      "GET",
      GET_ARTIST_ALBUMS + `/${artistId}/albums`,
      null,
      null,
      {
        limit: 10,
        offset: 0,
      }
    );
    if (!response?.data) {
      throw new Error("Unexpected response format");
    }
    return response.data;
  } catch (err) {
    throw new Error("Error in fetching Artist albums.");
  }
}

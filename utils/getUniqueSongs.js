// Description: Function to reduce the number of repeated songs in an array.
export function reduceUniqueSongs(songs, flag) {
  const uniqueIds = [];
  const uniqueSongs = [];

  for (const song of songs) {
    const id = flag === "album" ? song.id : song.track.id;
    if (id && !uniqueIds.includes(id)) {
      uniqueIds.push(id);
      uniqueSongs.push(song);
    }
  }

  return uniqueSongs;
}

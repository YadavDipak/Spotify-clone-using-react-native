// Function to get a combined list of playlists and artists based on the active category

export function getCombinedList(playlists, artists, activeCategory) {
  let combinedList = [];
  if (activeCategory === "All") {
    combinedList = [...playlists, ...artists];
    for (let index = combinedList.length - 1; index > 0; index--) {
      const value = Math.floor(Math.random() * (index + 1));
      [combinedList[index], combinedList[value]] = [
        combinedList[value],
        combinedList[index],
      ];
    }
    return combinedList;
  } else if (activeCategory === "Artists") {
    combinedList = artists;
  } else if (activeCategory === "Playlists") {
    combinedList = playlists;
  }

  return combinedList;
}

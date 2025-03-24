// import { createContext, useEffect, useState } from "react";
// import { getUsersPlaylist } from "../services/user";

// const FollowedPlaylistContext = createContext();

// const FollowedPlayListContextProvider = ({ children }) => {
//   const [followedPlaylists, setFollowedPlaylists] = useState([]);

//   const fetchFollowedPlaylists = async () => {
//     try {
//       const result = await getUsersPlaylist();

//       if (result) {
//         setFollowedPlaylists(result);
//       }
//     } catch (err) {
//       Alert.alert("Error", err.message);
//     }
//   };

//   useEffect(() => {
//     fetchFollowedPlaylists();
//   }, []);

//   return (
//     <FollowedPlaylistContext.Provider
//       value={{
//         followedPlaylists,
//         setFollowedPlaylists,
//         fetchFollowedPlaylists,
//       }}
//     >
//       {children}
//     </FollowedPlaylistContext.Provider>
//   );
// };

// export { FollowedPlaylistContext, FollowedPlayListContextProvider };

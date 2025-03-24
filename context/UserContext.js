// import { createContext, useEffect, useState } from "react";
// import { getCurrentUser } from "../services/user";
// import { Alert } from "react-native";

// const UserContext = createContext();

// const UserContextProvider = ({ children }) => {
//   const [user, setUser] = useState(null);

//   const fetchCurrentUser = async () => {
//     try {
//       const result = await getCurrentUser();

//       if (result) {
//         setUser(result);
//       }
//     } catch (err) {
//       Alert.alert("Error", err.message);
//     }
//   };

//   useEffect(() => {
//     fetchCurrentUser();
//   }, []);
//   return (
//     <UserContext.Provider value={{ user, setUser, fetchCurrentUser }}>
//       {children}
//     </UserContext.Provider>
//   );
// };

// export { UserContext, UserContextProvider };

// import React, { useEffect } from "react";
// import { Provider } from "react-redux";
// import { PersistGate } from "redux-persist/integration/react";
// import { store, persistor } from "./src/redux/store";
// import Navigation from "./StackNavigator";
// import { NavigationContainer } from "@react-navigation/native";
// import * as Linking from "expo-linking";

// // Configure Deep Linking
// const linking = {
//   prefixes: ["spotify-project://", "https://my-app-dipak.com"],
//   config: {
//     screens: {
//       Home: "home",
//       SongScreen: "song/:id",
//     },
//   },
// };

// const RootLayout = () => {
//   useEffect(() => {
//     const handleInitialURL = async () => {
//       const initialUrl = await Linking.getInitialURL();
//       if (initialUrl) {
//         console.log("App opened via deep link:", initialUrl);
//         Linking.openURL(initialUrl);
//       }
//     };

//     // Listen for incoming links when app is running
//     const handleDeepLink = (event) => {
//       console.log("Deep Link Opened:", event.url);
//     };

//     const subscription = Linking.addEventListener("url", handleDeepLink);

//     handleInitialURL();

//     return () => {
//       subscription.remove();
//     };
//   }, []);

//   return (
//     <Provider store={store}>
//       <PersistGate loading={null} persistor={persistor}>
//         <NavigationContainer linking={linking}>
//           <Navigation />
//         </NavigationContainer>
//       </PersistGate>
//     </Provider>
//   );
// };

// export default RootLayout;

// -------------------------
// ------------------------

// import React, { useEffect } from "react";
// import { Provider } from "react-redux";
// import { PersistGate } from "redux-persist/integration/react";
// import { store, persistor } from "./src/redux/store";
// import Navigation from "./StackNavigator";
// // import { NavigationContainer } from "@react-navigation/native";
// // import * as Linking from "expo-linking";

// // Configure Deep Linking

// const RootLayout = () => {
//   // useEffect(() => {
//   //   const handleInitialURL = async () => {
//   //     const initialUrl = await Linking.getInitialURL();
//   //     if (initialUrl) {
//   //       console.log("App opened via deep link:", initialUrl);
//   //       Linking.openURL(initialUrl);
//   //     }
//   //   };

//   //   // Listen for incoming links when app is running
//   //   const handleDeepLink = (event) => {
//   //     console.log("Deep Link Opened:", event.url);
//   //   };

//   //   const subscription = Linking.addEventListener("url", handleDeepLink);

//   //   handleInitialURL();

//   //   return () => {
//   //     subscription.remove();
//   //   };
//   // }, []);

//   return (
//     <Provider store={store}>
//       <PersistGate loading={null} persistor={persistor}>
//         <Navigation />
//       </PersistGate>
//     </Provider>
//   );
// };

// export default RootLayout;

import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./src/redux/store";
import Navigation from "./StackNavigator";

const RootLayout = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Navigation />
      </PersistGate>
    </Provider>
  );
};

export default RootLayout;

// import React, { useEffect } from "react";
// import { Provider } from "react-redux";
// import { PersistGate } from "redux-persist/integration/react";
// import { store, persistor } from "./src/redux/store";
// import Navigation from "./StackNavigator";

// const RootLayout = () => {
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
import SplashScreen from "react-native-splash-screen";

const RootLayout = () => {
  useEffect(() => {
    const hideSplash = async () => {
      // Ensure SplashScreen is not null before calling hide()
      if (SplashScreen && SplashScreen.hide) {
        SplashScreen.hide();
      }
    };

    setTimeout(hideSplash, 500); // Add a slight delay for stability
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Navigation />
      </PersistGate>
    </Provider>
  );
};

export default RootLayout;

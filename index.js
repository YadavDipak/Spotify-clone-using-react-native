import { registerRootComponent } from "expo";

import App from "./App";

import "./src/i18n/i18n.config";

registerRootComponent(App);

// import { registerRootComponent } from "expo";
// import App from "./App";
// import { initializeI18n } from "./src/i18n/i18n.config";

// const startApp = async () => {
//   await initializeI18n(); // Ensure i18n is initialized before rendering
//   registerRootComponent(App);
// };

// startApp();

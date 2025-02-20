import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import Navigation from "./StackNavigator";

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <Navigation />
    </NavigationContainer>
  );
}

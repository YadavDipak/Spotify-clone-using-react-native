import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Entypo from "@expo/vector-icons/Entypo";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";

import {
  NavigationContainer,
  NavigationIndependentTree,
} from "@react-navigation/native";

import { useTranslation } from "react-i18next";

import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import ProfileScreen from "./screens/ProfileScreen";
import SearchScreen from "./screens/SearchScreen";
import LikedSongsScreen from "./screens/LikedSongsScreen";
import ArtistsScreen from "./screens/ArtistsScreen";
import PlaylistScreen from "./screens/PlaylistScreen";
import LibraryScreen from "./screens/LibraryScreen";
import SongInfo from "./screens/SongInfo";
import AlbumScreen from "./screens/AlbumScreen";

const Tab = createBottomTabNavigator();

function BottomTabs() {
  const { t } = useTranslation();
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "rgba(0,0,0,0.5)",
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          shadowOpacity: 4,
          shadowRadius: 4,
          elevation: 4,
          shadowOffset: {
            width: 0,
            height: -4,
          },
          borderTopWidth: 0,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: t("Home"),
          headerShown: false,
          tabBarLabelStyle: { color: "white" },
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Entypo name="home" size={24} color="white" />
            ) : (
              <AntDesign name="home" size={24} color="white" />
            ),
        }}
      />
      {/* Search Section */}

      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarLabel: t("Search"),
          headerShown: false,
          tabBarLabelStyle: { color: "white" },
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Ionicons name="search-sharp" size={24} color="white" />
            ) : (
              <Ionicons
                name="search-outline"
                size={24}
                color="rgba(255, 255, 255, 0.7)"
              />
            ),
        }}
      />

      {/* Library Section */}

      <Tab.Screen
        name="Library"
        component={LibraryScreen}
        options={{
          tabBarLabel: t("Your Library"),
          headerShown: false,
          tabBarLabelStyle: {
            color: "white",
          },
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Ionicons name="library" size={24} color="white" />
            ) : (
              <Ionicons name="library-outline" size={24} color="white" />
            ),
        }}
      />

      {/* Profile Section */}
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: t("Profile"),
          headerShown: false,
          tabBarLabelStyle: { color: "white" },
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Ionicons name="person" size={24} color="white" />
            ) : (
              <Ionicons name="person-outline" size={24} color="white" />
            ),
        }}
      />
    </Tab.Navigator>
  );
}

const Stack = createNativeStackNavigator();

function Navigation() {
  return (
    <NavigationIndependentTree>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Main"
            component={BottomTabs}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Liked"
            component={LikedSongsScreen}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="Profile"
            component={ProfileScreen}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="PlaylistScreen"
            component={PlaylistScreen}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="ArtistsScreen"
            component={ArtistsScreen}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="SongInfo"
            component={SongInfo}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="AlbumScreen"
            component={AlbumScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </NavigationIndependentTree>
  );
}

export default Navigation;

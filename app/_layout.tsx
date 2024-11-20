import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import "react-native-reanimated";
import HomeScreen from "./index";
import "./global.css";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  return (
    <>
      <HomeScreen />
    </>
  );
}

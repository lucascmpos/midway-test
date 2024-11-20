import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import "react-native-reanimated";
import "./global.css";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Montserrat: require("./assets/fonts/Montserrat-Regular.otf"),
  });

  if (!fontsLoaded) {
    return null;
  }
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: "#FFFFFF",
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Home",
          contentStyle: {
            backgroundColor: "#FFFFFF",
          },
        }}
      />
      <Stack.Screen
        name="payment-method"
        options={{
          title: "Payment Method",
          contentStyle: {
            backgroundColor: "#FFFFFF",
          },
        }}
      />
    </Stack>
  );
}

import { Stack } from "expo-router";
import { StatusBar } from "react-native";

export default function RootLayout() {
  return (
    <>
      <Stack screenOptions={{ headerShown: false }} >
        <Stack.Screen name="index" />
      </Stack>
      <StatusBar backgroundColor={'#121212'} />
    </>
  )
}

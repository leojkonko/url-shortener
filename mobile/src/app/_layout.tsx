import { Slot } from "expo-router";
import { StatusBar, View } from "react-native";
import { styled } from "nativewind";
import { LinearGradient } from "expo-linear-gradient";

const GradientBackground = styled(LinearGradient);

export default function Layout() {
  return (
    <GradientBackground
      colors={["#a855f7", "#4f46e5"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      className="flex-1 justify-center items-center"
    >
      <StatusBar barStyle={"light-content"} backgroundColor="#000" />
      <Slot />
    </GradientBackground>
  );
}

import { useGame } from "@/hooks/gameHook";
import { useEffect } from "react";
import { Easing, Image, StyleSheet } from "react-native";
import Animated, {
  useAnimatedStyle,
  withSequence,
  withTiming,
} from "react-native-reanimated";

export default function Dino() {
  const { jumping, stopJump, dinoHeight } = useGame();

  function Handlejump() {
    dinoHeight.value = withSequence(
      withTiming(-200, {
        duration: 500,
        easing: Easing.linear,
      }),
      withTiming(
        0,
        {
          duration: 800,
          easing: Easing.linear,
        },
        () => {
          stopJump();
        },
      ),
    );
  }

  useEffect(() => {
    if (jumping) {
      Handlejump();
    }
  }, [jumping]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: dinoHeight.value,
      },
    ],
  }));

  return (
    <Animated.View style={[s.dino, animatedStyle]}>
      {jumping ? (
        <Image
          source={require("@/assets/images/gif.gif")}
          resizeMode="contain"
          style={s.image}
        />
      ) : (
        <Image
          source={require("@/assets/images/spider10.gif")}
          resizeMode="contain"
          style={s.image}
        />
      )}
    </Animated.View>
  );
}

const s = StyleSheet.create({
  dino: {
    width: 100,
    height: 100,
    position: "absolute",
    zIndex: 10,
    bottom: 0,
    left: 25,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});

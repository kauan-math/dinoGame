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
      withTiming(-100, {
        duration: 350,
        easing: Easing.linear,
      }),
      withTiming(
        0,
        {
          duration: 200,
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
          source={require("@/assets/images/spider4.gif")}
          resizeMode="contain"
          style={s.image2}
        />
      )}
    </Animated.View>
  );
}

const s = StyleSheet.create({
  dino: {
    width: 100,
    height: 200,
    position: "absolute",
    zIndex: 10,
    top: "30%",
    left: 25,
  },
  image: {
    width: 200,
    height: 200,
    right: 10,
    top: 80,
  },
  image2: {
    width: 100,
    height: 200,
    top: 120,
  },
});

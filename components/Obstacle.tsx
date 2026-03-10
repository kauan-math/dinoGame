import { default as MovingSpiderBitmap } from "@/assets/bitmaps/spider100.json";
import { default as spiderJumpingBitmap } from "@/assets/bitmaps/spiderJump100.json";
import { default as venomBitmap } from "@/assets/bitmaps/venom100.json";
import { useGame } from "@/hooks/gameHook";
import { router } from "expo-router";
import { useEffect } from "react";
import { Dimensions, Image, StyleSheet } from "react-native";
import Animated, {
  Easing,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

export default function Obstacle({ onEnd }: any) {
  const { width } = Dimensions.get("window");
  const offset = useSharedValue(0);
  const { dinoHeight } = useGame();

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: -offset.value }],
  }));

  useEffect(() => {
    offset.value = withTiming(
      width,
      {
        duration: 2500,
        easing: Easing.linear,
      },
      onEnd,
    );
  }, []);

  useAnimatedReaction(
    () => {
      return offset.value;
    },
    (currentValue) => {
      const ObstaclePosition = width - Math.round(currentValue);
      const dinoPosition = -Math.round(dinoHeight.value);
      const left = Math.max(25, ObstaclePosition);
      const right = Math.min(125, ObstaclePosition + 100);
      const bottom = Math.max(0, dinoPosition);
      const top = 100;
      if (left > right || bottom > top) {
        return;
      }
      console.log(left, right, top, bottom);

      for (let x = left; x < right; x++) {
        for (let y = bottom; y < top; y++) {
          const xDino = x - 25;
          const xObstacle = x - ObstaclePosition;
          const yDino = 100 - (y - dinoPosition);
          const yObstacle = 100 - y;

          const dinoBitmap =
            dinoHeight.value > 0 ? spiderJumpingBitmap : MovingSpiderBitmap;

          if (
            xDino < 100 &&
            xDino > -1 &&
            yDino < 100 &&
            yDino > -1 &&
            xObstacle < 135 &&
            xObstacle > -1 &&
            yObstacle < 100 &&
            yObstacle > -1 &&
            dinoBitmap[xDino][yDino] &&
            venomBitmap[xObstacle][yObstacle]
          ) {
            router.replace("/end");
          }
        }
      }
    },
  );

  return (
    <Animated.View style={[s.obstacles, animatedStyle]}>
      <Image
        source={require("@/assets/images/gifvenom.gif")}
        resizeMode="contain"
        style={s.image}
      />
    </Animated.View>
  );
}

const s = StyleSheet.create({
  image: {
    width: "100%",
    height: "100%",
  },
  obstacles: {
    width: 135,
    height: 100,
    position: "absolute",
    bottom: 0,
    right: 0,
  },
});

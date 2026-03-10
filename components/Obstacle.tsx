import {
  default as MovingSpiderBitmap,
  default as spiderJumpingBitmap,
} from "@/assets/bitmaps/spiderjump10.json";
import venomBitmap from "@/assets/bitmaps/venom10.json";
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
      const left = Math.max(25, width - ObstaclePosition);
      const right = Math.min(100, width - currentValue + 125);
      const bottom = Math.max(0, dinoHeight.value);
      const top = 125;
      if (left > right || bottom > top) {
        return;
      }

      for (let x = left; x < right; x++) {
        for (let y = bottom; y < top; y++) {
          const xDino = x - 25;
          const xObstacle = x - ObstaclePosition;
          const yDino = 100 - (y - dinoHeight.value);
          const yObstacle = 125 - y;

          const dinoBitmap =
            dinoHeight.value > 0 ? spiderJumpingBitmap : MovingSpiderBitmap;

          if (
            xDino > 100 &&
            xDino > -1 &&
            yDino < 100 &&
            yDino > -1 &&
            xObstacle < 125 &&
            xObstacle > -1 &&
            yObstacle < 125 &&
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
    width: 125,
    height: 200,
    position: "absolute",
    top: 250,
    right: 0,
  },
});

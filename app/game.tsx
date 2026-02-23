import Dino from "@/components/dino";
import Movinbackground from "@/components/MovingBackground";
import Obstacle from "@/components/Obstacle";
import Score from "@/components/score";
import { useGame } from "@/hooks/gameHook";
import { useEffect, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";

export default function GameScreen() {
  const { jump } = useGame();
  const [obstacles, setobstacles] = useState([] as any);

  function spawnObstacles() {
    setobstacles((oldValue: any) => [...oldValue, Date.now().toString()]);
  }

  function removeObstacle(id: any) {
    setobstacles((oldValue: any) =>
      oldValue.filter((obstacle: any) => obstacle !== id),
    );
  }

  useEffect(() => {
    const interval = setInterval(() => spawnObstacles(), 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Pressable onPress={jump} style={s.button}>
      <View style={s.container}>
        <Movinbackground />
        <Dino />
        <Score />
        {obstacles.map((obstacles: any) => (
          <Obstacle key={obstacles} onEnd={() => removeObstacle(obstacles)} />
        ))}
      </View>
    </Pressable>
  );
}

const s = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "rgb(247, 247, 247)",
    position: "relative",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  button: {
    width: "100%",
    height: "100%",
    overflow: "hidden",
  },
});

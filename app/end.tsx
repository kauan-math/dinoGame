import { useGame } from "@/hooks/gameHook";
import { Link } from "expo-router";
import { Image, ImageBackground, StyleSheet, Text, View } from "react-native";

export default function End() {
  const { score } = useGame();
  return (
    <View style={s.container}>
      <ImageBackground
        style={s.fundo}
        resizeMode="stretch"
        source={require("@/assets/images/fundo5.jpg")}
      />
      <View style={s.aranha}>
        <Image
          style={s.image}
          source={require("@/assets/images/spider7.png")}
        />
      </View>
      <View style={s.venom}>
        <Image style={s.image} source={require("@/assets/images/venom6.png")} />
      </View>

      <View style={s.textContainer}>
        <Text style={s.text}>FIM DE JOGO!!</Text>

        <Text style={s.text}>{score}</Text>

        <Link href="/" asChild>
          <Text style={s.button}>voltar</Text>
        </Link>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
  },

  aranha: {
    width: 200,
    height: 200,
    position: "absolute",
    zIndex: 10,
    top: 90,
    left: 650,
  },
  venom: {
    width: 220,
    height: 220,
    position: "absolute",
    zIndex: 10,
    left: 110,
    top: 180,
  },
  fundo: {
    width: "100%",
    height: "100%",
  },
  textContainer: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: "-50%" }, { translateY: "-50%" }],
    gap: 5,
    justifyContent: "center",
  },
  text: {
    width: "auto",
    fontSize: 30,
    top: -145,
    textAlign: "center",
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#00000077",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 40,
    color: "white",
    width: 100,
    alignSelf: "center",
    textAlign: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24,
  },
});

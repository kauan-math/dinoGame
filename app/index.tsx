import { Link } from "expo-router";
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function HomeScreen() {
  return (
    <ImageBackground
      style={s.back}
      source={require("@/assets/images/fundo3.jpg")}
      resizeMode="cover"
    >
      <Text style={s.title2}>Spider Run's Game</Text>
      <View style={s.container}>
        <Link href={"/game"} asChild replace>
          <TouchableOpacity style={s.button}>
            <Text style={s.title}>Jogar</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </ImageBackground>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    alignContent: "center",
    textAlign: "center",
  },

  title: {
    fontSize: 15,
    fontWeight: "bold",
  },

  title2: {
    fontSize: 40,
    padding: 20,
    fontWeight: "bold",
    justifyContent: "flex-start",
    left: 300,
    fontFamily: "Bookman, URW Bookman L, serif",
    color: "#ffffff",
  },

  back: {
    width: "100%",
    height: "100%",
  },

  button: {
    backgroundColor: "#d1d1d177",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 40,
    marginBottom: 40,
    justifyContent: "center",
    alignItems: "center",
    right: 0,
    width: 100,
    height: 50,
    bottom: 40,
  },
});

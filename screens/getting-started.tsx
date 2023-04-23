import * as React from "react";
import {
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Asset } from "expo-asset";

import RightArrow from "../icons/right-arrow";

const gettingStartedImage = Asset.fromModule(
  require("../assets/getting-started.png")
).uri;

const GettingStarted = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={{ uri: gettingStartedImage }}
        alt="Getting Started image"
        resizeMode="contain"
        style={styles.image}
      />
      <View style={styles.ctaContainer}>
        <Text style={styles.title}>Take Control of Your Finances Today!</Text>
        <Text style={styles.text}>
          Because you can't spend monopoly money in real life. So let's makes
          your wallet happy (and your bank account, too!)
        </Text>
        <Pressable style={styles.buttonContainer}>
          <Text style={styles.buttonText}>Get started</Text>
          <RightArrow stroke="#fff" />
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#dcfce7",
  },
  image: {
    width: "100%",
    height: "50%",
  },
  ctaContainer: {
    marginHorizontal: "10%",
    gap: 8,
  },
  title: {
    fontWeight: "700",
    fontSize: 32,
    color: "#030712",
  },
  text: {
    fontSize: 16,
    color: "#4b5563",
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "#06D188",
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 16,
    marginTop: 28,
  },
  buttonText: {
    fontWeight: "700",
    fontSize: 16,
    color: "#fff",
  },
});

export default GettingStarted;

import * as React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Asset } from "expo-asset";

import RightArrow from "../icons/right-arrow";
import Button from "../components/ui/button";
import type { RootStackParamList } from "../App";

const gettingStartedImage = Asset.fromModule(
  require("../assets/getting-started.png")
).uri;

type Props = NativeStackScreenProps<RootStackParamList, "GettingStarted">;

const GettingStarted = ({ navigation }: Props) => {
  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={{ uri: gettingStartedImage }}
        alt="Getting started image"
        resizeMode="contain"
        style={styles.image}
      />
      <View style={styles.ctaContainer}>
        <Text style={styles.title}>Take Control of Your Finances Today!</Text>
        <Text style={styles.text}>
          Because you can't spend monopoly money in real life. So let's makes
          your wallet happy (and your bank account, too!)
        </Text>
        <Button
          onPress={() => navigation.navigate("GettingStarted2")}
          style={styles.buttonContainer}>
          <Text style={styles.buttonText}>Get started</Text>
          <RightArrow stroke="#fff" />
        </Button>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f0fdf4",
    paddingBottom: 32,
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
    lineHeight: 22,
  },
  buttonContainer: {
    marginTop: 28,
  },
  buttonText: {
    fontWeight: "700",
    fontSize: 16,
    color: "#fff",
  },
});

export default GettingStarted;

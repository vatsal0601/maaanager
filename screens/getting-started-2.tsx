import * as React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import type { StackScreenProps } from "@react-navigation/stack";
import { Asset } from "expo-asset";
import * as SecureStore from "expo-secure-store";

import { useData } from "../contexts/DataContext";

import { handleName } from "../lib/handle-name";
import ArrowRight from "../icons/arrow-right";
import Loader from "../icons/loader";
import Button from "../components/ui/button";
import Input from "../components/ui/input";
import type { RootStackParamList } from "../App";

const gettingStartedName = Asset.fromModule(
  require("../assets/getting-started-name.png")
).uri;

type Props = StackScreenProps<RootStackParamList, "GettingStarted2">;

const GettingStarted2 = ({ navigation }: Props) => {
  const [name, setName] = React.useState({ value: "", error: "" });
  const [isLoading, setIsLoading] = React.useState(false);
  const { setName: setNameDataContext } = useData();

  const handleSubmit = async () => {
    const isNameValid = handleName(name, setName);

    if (!isNameValid) return;

    setIsLoading(true);
    await SecureStore.setItemAsync("maaanager-name", name.value);
    setNameDataContext(name.value);
    setIsLoading(false);
    navigation.navigate("GettingStarted3");
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={{ uri: gettingStartedName }}
        alt="Getting started image"
        resizeMode="contain"
        style={styles.image}
      />
      <View style={styles.ctaContainer}>
        <Text style={styles.title}>Let's Get Down to Business</Text>
        <Text style={styles.text}>
          Enter your name to personalize your experience. We'll encrypt and
          store it locally to greet you every time you open the app.
        </Text>
        <View style={styles.spacer} />
        <Input
          placeholder="John Doe"
          value={name.value}
          onChangeText={value => setName({ value, error: "" })}
          onEndEditing={() => handleName(name, setName)}
          error={name.error}
          editable={!isLoading}
          selectTextOnFocus={!isLoading}
        />
        <View style={styles.spacer} />
        <Button
          onPress={handleSubmit}
          disabled={isLoading || name.error.length > 0}
          style={styles.button}>
          {!isLoading ? (
            <>
              <Text style={styles.buttonText}>Next</Text>
              <ArrowRight stroke="#fff" />
            </>
          ) : (
            <>
              <Loader stroke="#fff" />
              <Text style={styles.buttonText}>Saving name</Text>
            </>
          )}
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
    backgroundColor: "#F0713603",
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
  spacer: {
    height: 4,
  },
  button: {
    backgroundColor: "#F07136",
  },
  buttonText: {
    fontWeight: "700",
    fontSize: 16,
    color: "#fff",
  },
});

export default GettingStarted2;

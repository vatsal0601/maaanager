import * as React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Asset } from "expo-asset";

import { addAccount } from "../database/accounts";
import { useData } from "../contexts/DataContext";

import { handleName } from "../lib/handle-name";
import Loader from "../icons/loader";
import Button from "../components/ui/button";
import Input from "../components/ui/input";
import type { RootStackParamList } from "../App";

const gettingStartedAccount = Asset.fromModule(
  require("../assets/getting-started-account.png")
).uri;

const GettingStarted3 = () => {
  const [name, setName] = React.useState({ value: "", error: "" });
  const [isLoading, setIsLoading] = React.useState(false);
  const { setAccountExists } = useData();

  const handleSubmit = async () => {
    const isNameValid = handleName(name, setName);

    if (!isNameValid) return;

    setIsLoading(true);
    await addAccount({ name: name.value });
    setIsLoading(false);
    setAccountExists(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={{ uri: gettingStartedAccount }}
        alt="Getting started image"
        resizeMode="contain"
        style={styles.image}
      />
      <View style={styles.ctaContainer}>
        <Text style={styles.title}>
          Let's Connect the Dots: Add Your Bank Account!
        </Text>
        <Text style={styles.text}>
          Sorry, no free money here (we wish!). Say goodbye to financial stress
          and hello to effortless money management. So let's add that account
          name and start thriving!
        </Text>
        <View style={styles.spacer} />
        <Input
          placeholder="Account name"
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
              <Text style={styles.buttonText}>Let's do it!</Text>
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
    backgroundColor: "#D181B603",
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
    backgroundColor: "#D181B6",
  },
  buttonText: {
    fontWeight: "700",
    fontSize: 16,
    color: "#fff",
  },
});

export default GettingStarted3;

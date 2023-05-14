import * as React from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as SecureStore from "expo-secure-store";

import { dropTables } from "../database";

import Button from "../components/ui/button";

const Profile = () => {
  const handleReset = async () => {
    await SecureStore.deleteItemAsync("maaanager-name");
    await dropTables();
  };

  return (
    <SafeAreaView>
      <Text>Profile Screen</Text>
      <Button onPress={handleReset}>
        <Text>Reset</Text>
      </Button>
    </SafeAreaView>
  );
};

export default Profile;

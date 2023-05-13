import * as React from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { dropTables } from "../database";

import Button from "../components/ui/button";

const Profile = () => {
  return (
    <SafeAreaView>
      <Text>Profile Screen</Text>
      <Button onPress={dropTables}>
        <Text>Drop Tables</Text>
      </Button>
    </SafeAreaView>
  );
};

export default Profile;

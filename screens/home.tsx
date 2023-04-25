import * as React from "react";
import { Pressable, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

import type { RootStackParamList } from "../App";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

const Home = ({ navigation }: Props) => {
  return (
    <SafeAreaView>
      <Text>Home Screen</Text>
    </SafeAreaView>
  );
};

export default Home;

import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import GettingStarted from "./screens/getting-started";
import GettingStarted2 from "./screens/getting-started-2";
import GettingStarted3 from "./screens/getting-started-3";

export type RootStackParamList = {
  GettingStarted: undefined;
  GettingStarted2: undefined;
  GettingStarted3: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="GettingStarted"
          component={GettingStarted}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="GettingStarted2"
          component={GettingStarted2}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="GettingStarted3"
          component={GettingStarted3}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

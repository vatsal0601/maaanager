import * as React from "react";
import { Text } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as SecureStore from "expo-secure-store";
import * as SplashScreen from "expo-splash-screen";

import { doAccountExists } from "./database/accounts";
import GettingStarted from "./screens/getting-started";
import GettingStarted2 from "./screens/getting-started-2";
import GettingStarted3 from "./screens/getting-started-3";
import { createTables } from "./database";

export type RootStackParamList = {
  GettingStarted: undefined;
  GettingStarted2: undefined;
  GettingStarted3: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const checkName = async () => {
  const name = await SecureStore.getItemAsync("maaanager-name");

  return name !== null && name.length > 0;
};

SplashScreen.preventAutoHideAsync();

const App = () => {
  const [areAccountsPresent, setAreAccountsPresent] = React.useState(false);
  const [isNamePresent, setIsNamePresent] = React.useState(false);

  React.useEffect(() => {
    const init = async () => {
      await createTables();

      const accountExists = await doAccountExists();
      setAreAccountsPresent(accountExists);

      const nameExists = await checkName();
      setIsNamePresent(nameExists);

      await SplashScreen.hideAsync();
    };

    init();
  }, []);

  if (isNamePresent && areAccountsPresent)
    return (
      <SafeAreaProvider>
        <SafeAreaView>
          <Text>Home</Text>
        </SafeAreaView>
      </SafeAreaProvider>
    );

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator>
          {!isNamePresent ? (
            <>
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
            </>
          ) : null}
          {!areAccountsPresent ? (
            <Stack.Screen
              name="GettingStarted3"
              component={GettingStarted3}
              options={{ headerShown: false }}
            />
          ) : null}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;

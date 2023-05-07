import * as React from "react";
import { StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as SecureStore from "expo-secure-store";
import * as SplashScreen from "expo-splash-screen";

import { createTables } from "./database";
import { doAccountExists } from "./database/accounts";

import GettingStarted from "./screens/getting-started";
import GettingStarted2 from "./screens/getting-started-2";
import GettingStarted3 from "./screens/getting-started-3";
import Home from "./screens/home";
import Profile from "./screens/profile";
import StatsIcon from "./icons/chart";
import HomeIcon from "./icons/home";
import ProfileIcon from "./icons/user";
import FundsIcon from "./icons/wallet";
import TabIcon from "./components/tab";

export type RootStackParamList = {
  GettingStarted: undefined;
  GettingStarted2: undefined;
  GettingStarted3: undefined;
};

export type TabParamList = {
  Home: undefined;
  Profile: undefined;
  Stats: undefined;
  Funds: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

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
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={{
              headerShown: false,
              tabBarShowLabel: false,
              tabBarStyle: styles.tabContainer,
            }}>
            <Tab.Screen
              name="Home"
              component={Home}
              options={{
                tabBarIcon: props => (
                  <TabIcon
                    focused={props.focused}
                    size={props.size}
                    icon={HomeIcon}
                    label="Home"
                    color="#41BB82"
                  />
                ),
              }}
            />
            <Tab.Screen
              name="Stats"
              component={Home}
              options={{
                tabBarIcon: props => (
                  <TabIcon
                    focused={props.focused}
                    size={props.size}
                    icon={StatsIcon}
                    label="Stats"
                    color="#F07136"
                  />
                ),
              }}
            />
            <Tab.Screen
              name="Funds"
              component={Home}
              options={{
                tabBarIcon: props => (
                  <TabIcon
                    focused={props.focused}
                    size={props.size}
                    icon={FundsIcon}
                    label="Funds"
                    color="#D181B6"
                  />
                ),
              }}
            />
            <Tab.Screen
              name="Profile"
              component={Profile}
              options={{
                tabBarIcon: props => (
                  <TabIcon
                    focused={props.focused}
                    size={props.size}
                    icon={ProfileIcon}
                    label="Profile"
                    color="#F9DA32"
                  />
                ),
              }}
            />
          </Tab.Navigator>
        </NavigationContainer>
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

const styles = StyleSheet.create({
  tabContainer: {
    paddingVertical: 12,
  },
});

export default App;

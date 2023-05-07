import * as React from "react";
import { StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as SplashScreen from "expo-splash-screen";

import { DataProvider, useData } from "./contexts/DataContext";

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

SplashScreen.preventAutoHideAsync();

const _App = () => {
  const { nameExists, accountExists } = useData();

  if (nameExists && accountExists)
    return (
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
    );

  return (
    <Stack.Navigator>
      {!nameExists ? (
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
      {!accountExists ? (
        <Stack.Screen
          name="GettingStarted3"
          component={GettingStarted3}
          options={{ headerShown: false }}
        />
      ) : null}
    </Stack.Navigator>
  );
};

const App = () => (
  <SafeAreaProvider>
    <DataProvider>
      <NavigationContainer>
        <_App />
      </NavigationContainer>
    </DataProvider>
  </SafeAreaProvider>
);

const styles = StyleSheet.create({
  tabContainer: {
    paddingVertical: 12,
  },
});

export default App;

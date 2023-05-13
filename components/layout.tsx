import * as React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  type StyleProp,
  type ViewStyle,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

interface LayoutProps {
  children: React.ReactNode;
  screenTitle: string;
  button?: React.ReactNode;
  wrapperStyle?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
}

const Layout = ({
  screenTitle,
  button,
  wrapperStyle,
  containerStyle,
  children,
}: LayoutProps) => {
  const tabBarHeight = useBottomTabBarHeight();

  return (
    <ScrollView
      alwaysBounceHorizontal={false}
      alwaysBounceVertical={false}
      bounces={false}
      overScrollMode="never"
      style={[styles.wrapper, { marginBottom: tabBarHeight }, wrapperStyle]}>
      <SafeAreaView style={[styles.container, containerStyle]}>
        <View style={styles.topContainer}>
          <Text style={styles.screenTitle}>{screenTitle}</Text>
          {button}
        </View>
        {children}
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    margin: "5%",
  },
  topContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#030712",
  },
});

export default Layout;

import * as React from "react";
import { StyleSheet, View, type StyleProp, type ViewStyle } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface LayoutProps {
  children: React.ReactNode;
  icon: React.ReactNode;
  button?: React.ReactNode;
  wrapperStyle?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
}

const Layout = ({
  icon,
  button,
  wrapperStyle,
  containerStyle,
  children,
}: LayoutProps) => {
  return (
    <View style={[styles.wrapper, wrapperStyle]}>
      <SafeAreaView style={[styles.container, containerStyle]}>
        <View style={styles.topContainer}>
          <View style={styles.iconContainer}>{icon}</View>
          {button}
        </View>
        {children}
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#41BB821A",
  },
  container: {
    flex: 1,
    margin: "5%",
  },
  topContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    width: 40,
    backgroundColor: "#030712",
    borderRadius: 8,
  },
});

export default Layout;

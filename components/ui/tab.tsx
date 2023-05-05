import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import type { SvgProps } from "react-native-svg";

interface Icon extends SvgProps {
  solid?: boolean;
}

interface TabProps {
  focused: boolean;
  icon: React.FC<Icon>;
  label: string;
  color: string;
  size: number;
}

const Tab = ({ focused, icon: Icon, label, color, size }: TabProps) => {
  return (
    <View style={styles.tabContainer}>
      {focused ? (
        <Icon
          width={size}
          height={size}
          fill={focused ? color : "#9ca3af"}
          solid
        />
      ) : (
        <Icon width={size} height={size} stroke={focused ? color : "#9ca3af"} />
      )}
      <Text style={[styles.tabText, focused && { color: color }]}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
  tabText: {
    fontWeight: "600",
    fontSize: 12,
    color: "#9ca3af",
  },
});

export default Tab;

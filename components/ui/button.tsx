import * as React from "react";
import { Pressable, StyleSheet, type PressableProps } from "react-native";

interface ButtonProps extends PressableProps {
  variant?: keyof typeof variantStyles;
}

const Button = ({
  variant,
  style,
  disabled,
  children,
  ...rest
}: ButtonProps) => {
  return (
    <Pressable
      style={[
        baseStyles.base,
        variantStyles[variant ?? "primary"],
        disabled && baseStyles.disabled,
        style,
      ]}
      {...rest}>
      {children}
    </Pressable>
  );
};

const baseStyles = StyleSheet.create({
  base: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 16,
  },
  disabled: {
    opacity: 0.5,
  },
});

const variantStyles = StyleSheet.create({
  primary: {
    backgroundColor: "#06D188",
  },
  secondary: {
    borderColor: "#e5e7eb",
    borderWidth: 2,
  },
  link: {},
});

export default Button;

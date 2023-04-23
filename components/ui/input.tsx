import * as React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  type TextInputProps,
} from "react-native";

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
}

const Input = ({ label, error, ...rest }: InputProps) => {
  return (
    <View style={styles.inputContainer}>
      {label && label.length > 0 ? (
        <Text style={styles.inputLabel}>{label}</Text>
      ) : null}
      <TextInput style={styles.input} {...rest} />
      {error && error.length > 0 ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    gap: 8,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#4b5563",
  },
  errorText: {
    fontSize: 14,
    color: "#dc2626",
  },
  input: {
    borderColor: "#e5e7eb",
    borderWidth: 2,
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 24,
    fontSize: 16,
    color: "#030712",
  },
});

export default Input;

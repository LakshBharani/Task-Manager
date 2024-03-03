import { StyleSheet, Text, View, TextInput } from "react-native";
import React from "react";
import { GlobalStyles } from "../../constants/styles";
import { useDarkMode } from "../../store/darkmode-context";

const Input = ({ label, textInputConfig, style, invalid }) => {
  const { isDarkMode } = useDarkMode();

  let inputStyles = [
    styles.input,
    !isDarkMode && { backgroundColor: GlobalStyles.lightColors.primary50 },
  ];

  if (textInputConfig.multiline) {
    inputStyles.push(styles.inputMultiLine);
  }

  if (invalid) {
    inputStyles.push(styles.invalidInputStyle);
  }

  return (
    <View style={[styles.inputContaner, style]}>
      <Text
        style={[
          styles.label,
          !isDarkMode && { color: GlobalStyles.lightColors.primary500 },
          invalid && !isDarkMode && styles.invalidLabelStyle,
        ]}
      >
        {label}
      </Text>
      <TextInput {...textInputConfig} style={inputStyles} />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  inputContaner: {
    marginHorizontal: 4,
    marginVertical: 8,
  },
  label: {
    fontSize: 12,
    color: GlobalStyles.darkColors.primary100,
    marginBottom: 4,
  },
  input: {
    color: GlobalStyles.darkColors.primary700,
    backgroundColor: GlobalStyles.darkColors.primary100,
    padding: 6,
    borderRadius: 6,
    fontSize: 18,
  },
  inputMultiLine: {
    minHeight: 100,
    textAlignVertical: "top",
  },
  invalidLabelStyle: {
    color: GlobalStyles.darkColors.error500,
  },
  invalidInputStyle: {
    backgroundColor: GlobalStyles.darkColors.error50,
  },
});

import { StyleSheet, Switch } from "react-native";
import React from "react";
import { useDarkMode } from "../../store/darkmode-context";
import { GlobalStyles } from "../../constants/styles";

const DarkModeSwitch = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <Switch
      style={styles.switch}
      value={isDarkMode}
      onValueChange={toggleDarkMode}
      thumbColor={GlobalStyles.darkColors.white}
      ios_backgroundColor="#3e3e3e"
    />
  );
};

export default DarkModeSwitch;

const styles = StyleSheet.create({
  switch: {
    marginLeft: 10,
  },
});

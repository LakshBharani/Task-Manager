import { StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { useDarkMode } from "../../store/darkmode-context";

const StatusBarComponent = () => {
  const { isDarkMode } = useDarkMode();
  return <StatusBar style={isDarkMode ? "light" : "dark"} />;
};

export default StatusBarComponent;

const styles = StyleSheet.create({});

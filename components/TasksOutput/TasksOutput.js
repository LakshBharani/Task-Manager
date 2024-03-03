import { StyleSheet, View, Text } from "react-native";
import TasksList from "./TasksList";
import TasksSummary from "./TasksSummary";
import { GlobalStyles } from "../../constants/styles";
import { useDarkMode } from "../../store/darkmode-context";

const TasksOutput = ({ tasks, tasksPeriod, fallBackText }) => {
  const { isDarkMode } = useDarkMode();

  let content = (
    <Text style={[styles.infoText, !isDarkMode && { color: "black" }]}>
      {fallBackText}
    </Text>
  );

  if (tasks.length > 0) {
    content = <TasksList tasks={tasks} />;
  }

  return (
    <View
      style={[
        styles.container,
        !isDarkMode && { backgroundColor: GlobalStyles.lightColors.white },
      ]}
    >
      <TasksSummary periodName={tasksPeriod} tasks={tasks} />
      {content}
    </View>
  );
};

export default TasksOutput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    paddingBottom: 0,
    backgroundColor: GlobalStyles.darkColors.primary700,
  },
  infoText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    marginTop: 32,
  },
});

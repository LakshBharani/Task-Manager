import { StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../../constants/styles";

const TasksSummary = ({ periodName, tasks }) => {
  const tasksSum = tasks.reduce((sum, task) => {
    return sum + task.amount;
  }, 0);

  function floatToHoursAndMinutes(floatValue) {
    const hours = Math.floor(floatValue);
    const minutesFloat = (floatValue - hours) * 60;
    const minutes = Math.round(minutesFloat);
    return { hours, minutes };
  }

  const { hours, minutes } = floatToHoursAndMinutes(tasksSum);

  return (
    <View style={styles.container}>
      <Text style={styles.period}>{periodName}</Text>
      <Text style={styles.sum}>
        {hours} {hours >= 1 ? "hr" : "hrs"} {minutes} mins
      </Text>
    </View>
  );
};

export default TasksSummary;

const styles = StyleSheet.create({
  container: {
    padding: 8,
    backgroundColor: GlobalStyles.darkColors.primary50,
    borderRadius: 6,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  period: {
    fontSize: 12,
    color: GlobalStyles.darkColors.primary400,
  },
  sum: {
    fontSize: 16,
    color: GlobalStyles.darkColors.primary500,
    fontWeight: "bold",
  },
});

import { Pressable, StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import { getFormattedDate } from "../../utility/date";
import { useNavigation } from "@react-navigation/native";

const TaskItem = ({ id, description, amount, date }) => {
  const navigation = useNavigation();

  function taskPresshandler() {
    navigation.navigate("ManageTask", { taskId: id });
  }

  return (
    <Pressable
      onPress={taskPresshandler}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <View style={styles.taskItem}>
        <View>
          <Text style={[styles.textBase, styles.textDescription]}>
            {description}
          </Text>
          <Text style={styles.textBase}>{getFormattedDate(date)}</Text>
        </View>
        <View style={styles.amountContainer}>
          <Text style={styles.amount}>{amount.toFixed(2)}</Text>
        </View>
      </View>
    </Pressable>
  );
};

export default TaskItem;

const styles = StyleSheet.create({
  taskItem: {
    padding: 12,
    marginVertical: 8,
    backgroundColor: GlobalStyles.darkColors.primary500,
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 6,
    elevation: 3,
    shadowColor: GlobalStyles.darkColors.gray500,
    shadowRadius: 4,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
  },
  textBase: {
    color: GlobalStyles.darkColors.primary50,
  },
  textDescription: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: "bold",
  },
  amountContainer: {
    paddingVertical: 4,
    paddingHorizontal: 12,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    minWidth: 80,
  },
  amount: {
    color: GlobalStyles.darkColors.primary500,
    fontWeight: "bold",
  },
  pressed: {
    opacity: 0.75,
  },
});

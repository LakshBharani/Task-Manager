import { ScrollView, StyleSheet, View } from "react-native";
import React, { useContext, useLayoutEffect } from "react";
import { GlobalStyles } from "../constants/styles";
import { TasksContext } from "../store/tasks-context";
import IconButton from "../components/ui/IconButton";
import TaskForm from "../components/ManageTasks/TaskForm";
import { useDarkMode } from "../store/darkmode-context";

const ManageTask = ({ route, navigation }) => {
  const tasksCtx = useContext(TasksContext);
  const { isDarkMode } = useDarkMode();

  const editedTaskId = route.params?.taskId;
  const isEditing = !!editedTaskId;

  const selectedTask = tasksCtx.tasks.find((task) => task.id === editedTaskId);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Task" : "Add Task",
    });
  }, [navigation, isEditing]);

  function deleteTaskHandler() {
    tasksCtx.deleteTask(editedTaskId);
    navigation.goBack();
  }

  function cancelHandler() {
    navigation.goBack();
  }

  function confirmHandler(taskData) {
    if (isEditing) {
      tasksCtx.updateTask(editedTaskId, taskData);
    } else {
      tasksCtx.addTask(taskData);
    }
    navigation.goBack();
  }

  return (
    <View
      style={[styles.container, !isDarkMode && { backgroundColor: "white" }]}
    >
      <ScrollView>
        <TaskForm
          onCancel={cancelHandler}
          onSubmit={confirmHandler}
          defaultValues={selectedTask}
          submitButtonLabel={isEditing ? "Update" : "Add"}
        />
        {isEditing && (
          <View style={styles.deleteContainer}>
            <IconButton
              icon={"trash"}
              color={
                isDarkMode
                  ? GlobalStyles.darkColors.error500
                  : GlobalStyles.lightColors.error500
              }
              size={36}
              onPress={deleteTaskHandler}
            />
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default ManageTask;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.darkColors.primary800,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.darkColors.primary200,
    alignItems: "center",
  },
});
